import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import InputBaseClass from '../inputBaseClass';
// import './snowDark.css';

export default class QuillForm extends InputBaseClass {
  constructor(props) {
    super(props); 
    this.quillRef = React.createRef();
  }

  getFormHtml() {
    
    return (
      <div 
      // title='Use [[ ]] around a Lore title to connect it'
       >

        <ReactQuill
          ref={this.quillRef}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline',
                // 'strike', 
                'blockquote'
              ], [{
                'color': ["#F4F5F8", "#E6FFFD", "#99AFD1", "#ecd23a", "#fd5259", "#D7ABF7", "#9EFFA0",
                  "#F4F5F888", "#E6FFFD77", "#99AFD188", "#ecd23a88", "#fd525988", "#D7ABF788", "#9EFFA088",
                  "#000000", "#E6FFFD44", "#99AFD155", "#ecd23a55", "#fd525955", "#D7ABF755", "#9EFFA055"]
              }, { 'background': [false, "black", "#00274D", "#C1A71B", "#5F0C0C", "#4B0082", "#002E07"] },],
              [, 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],                        // text direction
              // [{ 'header': [false, 1, 2, 3] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],


              // [],['link'], // Link insertion
              [], ['clean'],
              // remove formatting button
            
            ],
            
          }}

          style={this.props.wrapperStyle ?
            { ...this.props.wrapperStyle } : { minHeight: "100%", padding: "8px", minWidth: "99%", width: "100%", }
          } theme="snow" value={this.obj[0].getJson()[this.props.name]}
          onChange={this.objDispatch} />
      </div>
    )
}


}

/**
 * this component needs work.
 * bug: wierd space added every time refresh.
 */