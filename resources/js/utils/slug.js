export const slug = (string) => {
    let stringSlug = string.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    stringSlug = stringSlug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    stringSlug = stringSlug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    stringSlug = stringSlug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    stringSlug = stringSlug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    stringSlug = stringSlug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    stringSlug = stringSlug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    stringSlug = stringSlug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    stringSlug = stringSlug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    stringSlug = stringSlug.replace(/ /gi, '-');
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    stringSlug = stringSlug.replace(/\-\-\-\-\-/gi, '-');
    stringSlug = stringSlug.replace(/\-\-\-\-/gi, '-');
    stringSlug = stringSlug.replace(/\-\-\-/gi, '-');
    stringSlug = stringSlug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    stringSlug = '@' + stringSlug + '@';
    stringSlug = stringSlug.replace(/\@\-|\-\@|\@/gi, '');

    return stringSlug;
}