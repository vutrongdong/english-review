import { Editor } from '@tinymce/tinymce-react';
import * as blogApi from '@/apis/blogs';
import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/quickbars';


const EditorComponent = ({initialValue, handleChange, disabled}) => {
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const OnChangeHandler = () => {
    const content = tinymce.activeEditor.getContent();
    handleChange(content)
  }

  return (
    <Editor
      apiKey='sbz2uov3a0utd5h605qaoxkfiii1ee2mfmkvmarwwmhghnpr'
      initialValue={initialValue}
      onBlur={OnChangeHandler}
      disabled={disabled}
      init={{
        selector: 'textarea#full-featured',
        plugins: 'print preview importcss searchreplace autolink autosave visualchars fullscreen image link media template codesample table charmap hr nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars',
        menubar: 'file edit view insert format tools table tc help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap | fullscreen preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
        images_upload_handler: async function (blobInfo, success, failure, progress) {
          // error out if max is reached
          const file = blobInfo.blob();
          let dataSubmit = new FormData();
          dataSubmit.append('image', file);
          const result = await blogApi.uploadImage(dataSubmit);
          success(result);
        },
        document_base_url: `${process.env.MIX_ROOT_URL}/`,
        images_upload_base_path: '/',
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 600,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
        tinycomments_mode: 'embedded',
        content_style: '.mymention{ color: gray; }',
        contextmenu: 'link image imagetools table configurepermanentpen',
        a11y_advanced_options: true,
        skin: false,
        content_css: false,
        mentions_selector: '.mymention',
        mentions_item_type: 'profile',
        readonly : true
      }}
    />
  );
}

export default EditorComponent