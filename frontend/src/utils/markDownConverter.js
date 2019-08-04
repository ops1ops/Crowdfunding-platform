import SimpleMDE from 'simplemde';
import converter from 'html-to-markdown';

function markDownToHtml (data) {
    return SimpleMDE.prototype.markdown(data);
};

function htmlToMarkDown (data) {
    return converter.convert(data) ;
};

export const markDownHtmlConverter = {
    markDownToHtml,
    htmlToMarkDown
};

