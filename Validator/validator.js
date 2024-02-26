function validater (option) {
    var selecterRule = {};

    function getParent (element, selecter) {
        while(element.parentElement) {
            if(element.parentElement.matches(selecter)) {
                return element.parentElement
            } else {
                element = element.parentElement
            }
        }
    }
    function validate (inputElement, rule) {
        var formMessage = getParent(inputElement, option.parentElement).querySelector(option.errorElement)
        var messError 
        var rules = selecterRule[rule.selecter]
        
        for (var i = 0; i < rules.length; i++ ) {
           messError = rules[i](inputElement.value)
           if(messError) break
        }

        if(messError) {
            formMessage.innerText = messError;
            inputElement.parentElement.classList.add('invalid')
        } else {
            formMessage.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
        return !messError;
    }

    var formElement = document.querySelector(option.form)
    
    if(formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault()
            var isFormVal = true;
            option.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selecter)
                var isValid = validate(inputElement, rule)

                if(!isValid) {
                    isFormVal = false;
                }
            })

            if(isFormVal) {
                if(typeof option.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value
                        return values;
                    }, {})
                    option.onSubmit(formValues)
                } else {
                    formElement.onSubmit();
                }
            }
        }

        option.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selecter)
            var formMessage = getParent(inputElement, option.parentElement).querySelector(option.errorElement)
            
            if(Array.isArray(selecterRule[rule.selecter])) {
                selecterRule[rule.selecter].push(rule.test)
            } else {
                selecterRule[rule.selecter] = [rule.test]
            }


            if(inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                inputElement.oninput = function () {
                    formMessage.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

validater.isRequired = function (selecter, message) {
    return {
        selecter: selecter,
        test: function (value) {
            return value.trim() ? undefined : message || 'vui lòng nhập trường này'
        }
    }
}

validater.isEmail = function (selecter, message) {
    return {
        selecter: selecter,
        test: function (value) {
            var regax = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i;
            return regax.test(value) ? undefined : message || 'Email chưa chính xát'
        }
    }
}

validater.isPassword = function (selecter, min, message) {
    return {
        selecter: selecter,
        test: function (value) {
            return value.length >= min ? undefined : message || `vui lòng nhập ${min} kí tự`
        }
    }
}

validater.isConfirm = function (selecter, confirm, message) {
    return {
        selecter: selecter,
        test: function (value) {
            return value === confirm() ? undefined : message || 'giá trị nhập vào chưa chính xát'
        }
    }
}