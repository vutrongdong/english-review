export const visiblePassword = (iconId, inputId) => {
  $(`#${iconId}`).toggleClass("fa-eye field-icon fa-eye-slash");
  const input = $(`input[name=${inputId}`);
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
}