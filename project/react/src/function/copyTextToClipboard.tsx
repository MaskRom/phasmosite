// export const copyTextToClipboard = (text: string): void => {
//   try {
//     const textArea = document.createElement("textarea");
//     textArea.value = text;
//     document.body.appendChild(textArea);

//     const range = document.createRange();
//     range.selectNodeContents(textArea);
//     const selection = window.getSelection();
//     if (selection) {
//       selection.removeAllRanges();
//       selection.addRange(range);

//       textArea.setSelectionRange(0, text.length);
//       document.execCommand("copy");
//       document.body.removeChild(textArea);

//     } else {

//     }
//   } catch (err) {
//     navigator.clipboard.writeText(text);
//   }
// };

export const copyTextToClipboard = (text: string): void => {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();
    textArea.setSelectionRange(0, text.length);

    if (document.queryCommandSupported("copy")) {
      document.execCommand("copy");
    }

    document.body.removeChild(textArea);
  } catch (err) {
    // エラーハンドリング
    console.error("Failed to copy text to clipboard:", err);
  }
};