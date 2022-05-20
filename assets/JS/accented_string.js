export default function handleAccentedString(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    return string;
}