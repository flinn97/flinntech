import binder from "../../serviceTech/Util/binder";
import { Link } from "react-router-dom";


export default class HtmlBuilderBaseClass {
    constructor(obj) {
        binder.bind(this);
        this.props = { ...obj };
        this.content = obj.content || '';
        this.type = "div"
    }
    setHtmlType(type) {
        this.type = type

    }
    getHtmlType() {
        return this.type
    }
    setProp(name, val) {
        this.props[name] = val;
    }
    setProps(p) {
        this.props = { ...p };
        if(p.content){
            this.content = p.content
        }
    }
    updateProps(p){
        this.props = { ...this.props, ...p };
        if(p.content){
            this.content = p.content
        }
    }

    addProps(p){
        this.props = { ...this.props, ...p };
        if(p.content){
            this.content = p.content
        }
    }
    getProps() {
        return this.props;
    }
    getProp(name) {
        return this.props[name];
    }

    setStyle(style) {
        this.props.style = style;
    }
    updateStyle(s){
        this.props.style= {...this.props.style, ...s}
    }
    getStyle() {
        return this.props.style;
    }
    setClass(c) {
        this.props.className = c;
    }
    getClass() {
        return this.props.className
    }
    setOnChange(onChange) {
        this.props.onChange = onChange;
    }


    setOnClick(onClick) {
        this.props.onClick = onClick;
    }
    getOnClick() {
        return this.props.onClick;
    }


    setContent(content) {
        this.content = content;
    }

    getContent() {
        return this.content
    }


    getHtml(obj) {
        let { content, props } = obj;
        let type = obj?.type;
        if (content) {
            this.content = content;
        }


        props = { ...this.props, ...props };

        const types = {
            a: <a {...props}>{this.content}</a>,
            button: <button {...props}>{this.content}</button>,
            div: <div {...props}>{this.content}</div>,
            h1: <h1 {...props}>{this.content}</h1>,
            h2: <h2 {...props}>{this.content}</h2>,
            h3: <h3 {...props}>{this.content}</h3>,
            h4: <h4 {...props}>{this.content}</h4>,
            h5: <h5 {...props}>{this.content}</h5>,
            h6: <h6 {...props}>{this.content}</h6>,
            img: <img {...props} />,
            input: <input {...props} />,
            p: <p {...props}>{this.content}</p>,
            span: <span {...props}>{this.content}</span>,
            table: <table {...props}>{this.content}</table>,
            tr: <tr {...props}>{this.content}</tr>,
            td: <td {...props}>{this.content}</td>,
            th: <th {...props}>{this.content}</th>,
            ul: <ul {...props}>{this.content}</ul>,
            li: <li {...props}>{this.content}</li>,
            ol: <ol {...props}>{this.content}</ol>,
            form: <form {...props}>{this.content}</form>,
            textarea: <textarea {...props}>{this.content}</textarea>,
            select: <select {...props}>{this.content}</select>,
            option: <option {...props}>{this.content}</option>,
            label: <label {...props}>{this.content}</label>,
            nav: <nav {...props}>{this.content}</nav>,
            footer: <footer {...props}>{this.content}</footer>,
            header: <header {...props}>{this.content}</header>,
            article: <article {...props}>{this.content}</article>,
            section: <section {...props}>{this.content}</section>,
            aside: <aside {...props}>{this.content}</aside>,
            main: <main {...props}>{this.content}</main>,
            video: <video {...props}>{this.content}</video>,
            audio: <audio {...props}>{this.content}</audio>,
            iframe: <iframe {...props}>{this.content}</iframe>,
            canvas: <canvas {...props}>{this.content}</canvas>,
            content: <></>,
            fragment: <>{this.content}</>,
            link: <Link {...props}>{this.content}</Link>
        };
        
       
        if(type==="content"||this.type==="conent"){
            let Comp = this.content;

            types.content=<Comp {...props} />;
        }


        let component = type ? types[type] : types[this.type];

        return component;
    }
}

