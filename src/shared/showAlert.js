import Swal from "sweetalert2";

/**
 * Alert
 * @param {Object} param alert's config
 * @param {"success" | "error" | "info"} param.type alert's type
 * @param {string} param.title alert's title
 * @param {string} [param.message] alert's message
 * @returns Show an alert
 */
export default function showAlert({ type, title, message }) {
  return Swal.fire({
    icon: type,
    title,
    text: message,
  });
}
