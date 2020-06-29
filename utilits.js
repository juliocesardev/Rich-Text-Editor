
function validURL(str) {
    let pattern = new RegExp('((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' ,'i');
    return !!pattern.test(str);
}

function handleFileSelect(evt) {
    file = evt.target.files[0];

    let reader = new FileReader();

    reader.onload = (function(file) {
        return function(e) {
            let str = e.target.result;
            let res = str.replace("script", "div");
            window.editor.innerHTML = res;
        };
    })(file);

    reader.readAsText(file);
}

function getYoutubeVideoId(url)
{
    let video_id = -1;

    if(url.indexOf('youtu.be') != -1) {
        url = url.split('/');
        video_id = url[url.length - 1];
    } else if(url.indexOf('youtube') != -1) {
        video_id = url.split('v=')[1];
    }
    
    if(video_id != -1)
    {
        let ampersandPosition = video_id.indexOf('&');
     
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
    }

    return video_id;
}
