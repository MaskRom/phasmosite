export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {


    }, (err) => {
  
      console.error(err)
    });
}