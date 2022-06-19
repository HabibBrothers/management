const inputList = {};
const changeInput = (v, input) => {
  inputList.input[input].changeAttributeN("value", v.value);
};

const changeInputFile = (v, input) => {
  inputList.file[input].changeAttributeN("file", v.files[0]);
};

window.nin = changeInput;
window.nif = changeInputFile;

export { inputList };
