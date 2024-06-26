export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const REGEX_NUMBER = /^[0-9.]+$/;

export const REGEX_NO_SPECIAL_CHARACTERS = /^[^~`!@$#%^&*()+=<>?/;:.'"[\]{}|\\]+$/i;

export const REGEX_UNSIGNED_LETTERS =
  /^[^áàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵđÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬÉÈẺẼẸẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢÚÙỦŨỤỨỪỬỮỰÝỲỶỸỴĐ]+$/;

export const REGEX_NO_WHITESPACES = /\s/;

export const REGEX_PHONE = /(84|0[1-9])+([0-9]{8,9})\b/g;
