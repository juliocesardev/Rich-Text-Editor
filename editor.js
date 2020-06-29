class Editor {

    constructor(elem_tools_id, elem_editor_id) {
        // Tools elemente
        this.tools = document.getElementById(elem_tools_id);
        // Editor elemente
        this.editor_text = document.getElementById(elem_editor_id).focus();
        //
        this.counterHeaders = 0;
        //
        this.text_selected = '';
        
        document.execCommand("defaultParagraphSeparator", false, "div");
        document.execCommand('formatBlock', false, 'div');
        // Adiciona controles
        this.addControls();
    }
    // Adiciona controles
    addControls() {

        let list_tools = document.createElement("UL");
        list_tools.setAttribute('class', 'tools');

        let list_tools_attr = [
            // BUTTONS
            { icon: 'fas fa-undo',          tooltip_text: 'Desfazer',                   type: 'button',     action: this.MakeUndo },
            { icon: 'fas fa-redo',          tooltip_text: 'Refazer',                    type: 'button',     action: this.MakeRedo },
            { icon: 'fas fa-remove-format', tooltip_text: 'Limpar formatação',          type: 'button',     action: this.RemoveFormat },
            { icon: 'fas fa-bold',          tooltip_text: 'Negrito',                    type: 'button',     action: this.MakeBold },
            { icon: 'fas fa-italic',        tooltip_text: 'Itálico',                    type: 'button',     action: this.MakeItalic },
            { icon: 'fas fa-underline',     tooltip_text: 'Sublinhar',                  type: 'button',     action: this.MakeUnderline },
            { icon: 'fas fa-strikethrough', tooltip_text: 'Traço',                      type: 'button',     action: this.MakeStrike },
            { icon: 'fas fa-list',          tooltip_text: 'Lista com marcas',           type: 'button',     action: this.MakeList },
            { icon: 'fas fa-list-ol',       tooltip_text: 'Lista numerada',             type: 'button',     action: this.MakeNumericList },
            { icon: 'fas fa-align-right',   tooltip_text: 'Alinhar a direita',          type: 'button',     action: this.MakeAlignRight },
            { icon: 'fas fa-align-left',    tooltip_text: 'Alinhar a esquerda',         type: 'button',     action: this.MakeAlignLeft },
            { icon: 'fas fa-align-center',  tooltip_text: 'Alinhar ao centro',          type: 'button',     action: this.MakeAlignCenter },
            { icon: 'fas fa-align-justify', tooltip_text: 'Justificar',                 type: 'button',     action: this.MakeAlignJustify },
            { icon: 'fas fa-link',          tooltip_text: 'Inserir link',               type: 'button',     action: this.MakeLink },
            { icon: 'fab fa-youtube',       tooltip_text: 'Inserir Video do Youtube',   type: 'button',     action: this.MakeVideo },
            { icon: 'fas fa-image',         tooltip_text: 'Inserir imagem',             type: 'button',     action: this.MakeImage },
            { icon: 'fas fa-file-upload',   tooltip_text: 'Carregar artigo',            type: 'button',     action: this.UploadFile },
            { icon: 'fas fa-file-download', tooltip_text: 'Download do artigo',         type: 'button',     action: this.DownloadFile },
            // SELECTS
            { icon: undefined,          tooltip_text: 'Estilos',            type: 'select',     action: this.ChangeHeader, data: [
                { title: 'Formatação',  value: undefined},
                { title: 'Normal',      value: 'div'},
                { title: 'Título 1',    value: 'H1'},
                { title: 'Título 2',    value: 'H2'},
                { title: 'Título 3',    value: 'H3'},
                { title: 'Título 4',    value: 'H4'},
                { title: 'Título 5',    value: 'H5'},
                { title: 'Título 6',    value: 'H6'}
            ]},
            { icon: undefined,          tooltip_text: 'Tamanho do tipo de letra', type: 'select',     action: this.ChangeSizeFont, data: [
                { title: 'Tamanho',         value: undefined},
                { title: 'Muito pequeno',   value: '1'},
                { title: 'Pequeno',         value: '2'},
                { title: 'Normal',          value: '3'},
                { title: 'Médio',           value: '4'},
                { title: 'Grande',          value: '5'},
                { title: 'Muito grande',    value: '6'},
                { title: 'Máximo',          value: '7'}
            ]},
        ];

        list_tools_attr.forEach(element => {

            let tool = document.createElement("LI");
            tool.setAttribute('class', 'tool-item tooltip');
            
            let tooltip = document.createElement("SPAN");
            tooltip.setAttribute('class', 'tooltiptext');
            tooltip.innerHTML = element.tooltip_text;

            switch(element.type) {

                case 'button':
                    let button = document.createElement("BUTTON");
                    button.setAttribute('class', 'button-item');
                    button.addEventListener("click", element.action);

                    let icon = document.createElement("I");
                    icon.setAttribute('class', `${element.icon}`);

                    button.appendChild(icon);
                    
                    tool.appendChild(button);
                break;
                case 'select':
                    let select = document.createElement("SELECT");
                    select.setAttribute('class', 'select-item');
                    select.addEventListener("change", element.action);

                    element.data.forEach(elem => {
                        let option = document.createElement("OPTION");
                        option.innerHTML = elem.title;

                        if(elem.value === undefined) {
                            option.setAttribute('disabled', true);
                            option.setAttribute('selected', true);
                        } else {
                            option.setAttribute('value', elem.value);
                        }

                        select.appendChild(option);
                    });
                    
                    tool.appendChild(select);
                    break;
            }

            
            tool.appendChild(tooltip);

            list_tools.appendChild(tool);
        });

        this.tools.appendChild(list_tools);        

    }
    // funcao test
    test() {
        console.log(this);
    }
    MakeHeader() {

        let sText = document.getSelection();
        
        if(window.editor.text_selected != sText.baseNode.data) {
            window.editor.counterHeaders = 0;
            console.log("Diferente!");
        }

        if (sText.baseNode.data != "")
        {
            if(window.editor.counterHeaders > 5)
            {                                
                window.editor.counterHeaders = 0;
            }

            switch(window.editor.counterHeaders) {
                case 0:
                    document.execCommand("formatBlock", false, "H6");
                    break;
                case 1:
                    document.execCommand("formatBlock", false, "H5");
                    break
                case 2:
                    document.execCommand("formatBlock", false, "H4");
                    break
                case 3:
                    document.execCommand("formatBlock", false, "H3");
                    break
                case 4:
                    document.execCommand("formatBlock", false, "H2");
                    break
                case 5:
                    document.execCommand("formatBlock", false, "H1");
                    break
            }
            
            window.editor.counterHeaders++;
            window.editor.text_selected = sText.baseNode.data;

        }
        else
        {
            alert("Please select some text!");
        }   
    }
    MakeUndo () {
        document.execCommand("undo", false, null);
    }
    MakeRedo () {
        document.execCommand("redo", false, null);
    }
    ChangeHeader () {
        document.execCommand("formatBlock", false, this[this.selectedIndex].value);
        this.selectedIndex = 0;
    }
    ChangeSizeFont() {
        document.execCommand("fontsize", false, this[this.selectedIndex].value);
        this.selectedIndex = 0;
    }
    MakeBold() {
        document.execCommand("bold", false, null);
    }
    MakeItalic() {
        document.execCommand("italic", false, null);
        //
    }
    MakeUnderline() {
        document.execCommand("underline", false, null);
    }
    MakeStrike() {
        document.execCommand("strikeThrough", false, null);
    }
    MakeList() {
        document.execCommand("insertunorderedlist", false, null);
    }
    MakeNumericList() {
        document.execCommand("insertorderedlist", false, null);
    }
    MakeAlignRight() {
        document.execCommand("justifyright", false, null);
    }
    MakeAlignLeft() {
        document.execCommand("justifyleft", false, null);
    }
    MakeAlignCenter() {
        document.execCommand("justifycenter", false, null);
    }
    MakeAlignJustify() {
        document.execCommand("justifyfull", false, null);
    }
    MakeLink () {
        let url = prompt("URL:");

        if(validURL(url))
        {
            document.execCommand("createLink", false, url);
        }
    }
    MakeVideo() {
        var url = prompt("URL do Video do Youtube:\nExemplo: youtube.com/watch?v=XXXXXXXX ou youtu.be/XXXXXXXX");

        if(validURL(url))
        {
            let video_id = getYoutubeVideoId(url);

            if(video_id != -1)
            {
                url = `https://www.youtube.com/embed/${video_id}`;

                var youtube_html = `<iframe style="width: 100%; height: 285px;" src="${url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
                document.execCommand("inserthtml", false, youtube_html);
            }
            else
            {
                alert("Invalid URL!");
            }
        }
    }
    MakeImage() {
        
        let url = prompt("Image URL:", 'http://');
        
        if(validURL(url))
        {
            document.execCommand("insertimage", false, url);
        }
    }
    RemoveFormat() {
        //
        if (document.getSelection().baseNode.data != "")
        {
            document.execCommand("removeFormat", false, null);
            document.execCommand("unlink", false, null);
        }

    }
    UploadFile() {
        let form = document.createElement("FORM");
        let input = document.createElement("INPUT");

        form.setAttribute('enctype', 'multipart/form-data');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'text/plain');
        input.setAttribute('name', 'file');
        input.addEventListener('change', handleFileSelect);

        form.appendChild(input);
        
        document.body.appendChild(form);

        input.click();

        form.remove();
        
    }
    DownloadFile() {
        let text = window.editor.innerHTML;
        let a = document.createElement("a");
        let blob = new Blob([text], {type: "text/plain;charset=utf-8" });
        let url = window.URL.createObjectURL(blob);
        let d = new Date();
        let n = d.getTime();

        document.body.appendChild(a);
        
        a.style = "display: none";
        a.href = url;
        a.download = `artigo-${n}.txt`;
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);

    }
}
