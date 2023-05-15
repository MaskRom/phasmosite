import React from 'react';



type TMarkdownField = {
  text: string | null;
}

export const MarkdownField = (props: TMarkdownField) => {


  if (!props.text) return <div className="no_data_text">情報がありません</div>
  return (
    <>
      {props.text}
    </>
  );
}