    // Đối tượng validator
    function Validator(options)
    {
    function getParent(element, selector)
    {
    while(element.parentElement)
    {
    if(element.parentElement.matches(selector))
    return element.parentElement;
    // Nhảy tới thằng cha tiếp theo
    element = element.parentElement;
    }
    }
    var selectorRules={};
    // Hàm xóa hiển thị thông báo sai
    function DeleteErrorMessage(inputElement,errorElement)
    {
    errorElement.innerText = '';
    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
    }
    // Ham thuc hien validate
    function validate(inputElement,rule)
    {
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
    var errorMessage;
    //lấy ra các rules của selector
    var rules = selectorRules[rule.selector];
    //Lặp qua từng rule và kiểm tra
    //Nếu có lỗi thì dừng việc kiểm tra
    //Chạy từng hàm có trong từng trường theo thứ tự bên file html
    //Hàm nào có lỗi thì sẽ trả về một message, thì sẽ dừng và chạy logic phía dưới
    //Nếu cả tất cả hàm ko có lỗi thì sẽ xóa đi khung đỏ
    for(let i=0;i<rules.length;i++)
    {
    switch(inputElement.type)
    {
    case 'radio':
    case 'checkbox':
        errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
        break;
    default:
        errorMessage = rules[i](inputElement.value);
    }

    if(errorMessage)
    break; 
    }
    if(errorMessage)
    {
    errorElement.innerText = errorMessage;
    getParent(inputElement, options.formGroupSelector).classList.add('invalid');
    }
    else
    {
    DeleteErrorMessage(inputElement,errorElement);
    }
    //Nếu không phải chuỗi rỗng thì convert sang true -> 2 dấu chấm than
    //Nếu 1 dấu chấm than thì phủ định ngược lại
    return !!errorMessage;
    }
    // Lấy element cần validate
    var formElement = document.querySelector(options.form)
    if(formElement)
    {
    formElement.onsubmit = (e) =>
    {
    //Bỏ hành vi mặc định của submit form đi
    e.preventDefault();
    //Lặp qua từng rules và validate luôn
    var isValid=true; //Biến kiểm tra xem form đã nhập đúng hết chưa
    options.rules.forEach(function(rule)
    {
    var inputElement = formElement.querySelector(rule.selector);
    if(validate(inputElement,rule))//Nếu validate thành công thì nó sẽ trả về message, message đã đc convert sang boolen ở phía trên
    {
    isValid = false; // validate ko thành công
    }
    })
    //Thành công thì bắt đầu lấy value của từng input gán vào object
    if(isValid)
    {
    //Trường hợp submit với js
    // Lấy ra tất cả thẻ có name, tùy vào yêu cầu bài toán mà có thêm [name]:not(disable) 
    // để lấy ra những ô input có name nhưng ko có disable
    if(typeof options.onSubmit === "function")
    {
    var EnableInput = formElement.querySelectorAll('[name]');
    var formValue = Array.from(EnableInput).reduce(function(value, input)
    {   
        switch(input.type)
        {
        case 'radio':
            value[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
            break;
        case 'checkbox':
                if(input.checked){
                    if(Array.isArray(value[input.name])){
                        value[input.name].push(input.value)
                    } 
                    else {
                        value[input.name] = [input.value] 
                    }
                } 
                if(!value[input.name]){
                    value[input.name] = '';
                }
            break;
        case 'file':
            value[input.name] = input.files;
        default:
            value[input.name] = input.value;  
        }
        return value;
    },{});
    options.onSubmit(formValue);
    }
    //Trường hợp submit với hành vi mặc định
    else
    {
    formElement.submit();
    }
    }
    //Nếu validate ko thành công thì báo lỗi
    else
    {
    console.log("Có lỗi")
    }
    }
    //Lặp qua mỗi rule và xử lý (lắng nghe sự kiến blur, input, ...)
    options.rules.forEach(function(rule)
    {
    // lưu lại các rule cho mỗi input
    if(Array.isArray(selectorRules[rule.selector]))
    {
    selectorRules[rule.selector].push(rule.test)
    }
    else
    {
    selectorRules[rule.selector] = [rule.test]
    }
    var inputElements = formElement.querySelectorAll(rule.selector);
    Array.from(inputElements).forEach(function(inputElement)
    {
    if(inputElement)
    {
    // Xử lí trường hợp blur ra ngoài
    inputElement.onblur = () =>{
        validate(inputElement,rule);
    }
    //Xử lí onchange khi có khi select trong form, phải chọn đúng option, chọn sai thì hiện thông báo ngay
    inputElement.onchange = () =>{
        validate(inputElement,rule);
        }
    // XỬ lí input thì tắt thông báo
    inputElement.oninput = () => {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        DeleteErrorMessage(inputElement,errorElement);
    }
    }
    })
    });
    }


    }
    // Định nghĩa các rules
    Validator.isRequired = function(selector, message)
    {
    return {
    selector,
    test(value)
    {
    // Tùy vào trường hợp thẻ input có type gì thì sửa lại, chỉ xử lí khí nó
    // ở dạng radio, checkbox
    if(document.querySelector(selector).type == 'radio' || document.querySelector(selector).type == 'checkbox')
    return value ? undefined : message || "Vui lòng nhập trường này";
    else
    return value.trim() ? undefined : message || "Vui lòng nhập trường này";

    }
    };
    }
    Validator.isEmail = function(selector, message)
    {
    return {
    selector,
    test(value)
    {
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(value) ? undefined : message || "Trường này phải là email"
    }
    };
    }
    Validator.isMinlength = function(selector,min, message)
    {
    return {
    selector,
    test(value)
    {
    return value.length >= min ? undefined : message || "Vui lòng nhập hơn 6 kí tự";
    }
    };
    }
    Validator.isConfirmed = function(selector,getConfirmValue, message)
    {

    return {
    selector,
    test(value)
    {
    return value == getConfirmValue() ? undefined : message || 'Giá trị nhập không chính xác'
    }
    };
    }