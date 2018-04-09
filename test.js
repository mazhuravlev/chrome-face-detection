const faceDetector = new window.FaceDetector();
const img = document.querySelector('img');
const boxes = document.querySelector('.boxes');

img.onload = () => detectFaces();

function detectFaces() {
    removeChildren(boxes);
    faceDetector.detect(img).then(faces => {
    faces.forEach(face => {
        console.log(face.landmarks);
        const {left, top, width, height} = face.boundingBox;
        const faceDiv = document.createElement("div");
        faceDiv.classList.add('face');
        const {style} = faceDiv;
        style.left = left;
        style.top = top;
        style.width = width;
        style.height = height;
        boxes.append(faceDiv);
    });
});
}

function removeChildren(node) {
    let last;
    while (last = node.lastChild) node.removeChild(last);
};

function imageClick() {
    document.querySelector('input').click();
}

function loadImage({files}) {
    if(!files.length) return;
    const reader  = new FileReader();
    reader.onloadend = function () {
        img.src = reader.result;
    }
    reader.readAsDataURL(files[0]);
}