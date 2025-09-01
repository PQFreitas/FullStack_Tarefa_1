document.addEventListener('DOMContentLoaded', function()
{
    const form = document.getElementById('ticketForm');

    // Elementos para mensagens de erro
    const errorElements =
    {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        type: document.getElementById('type-error'),
        avatar: document.getElementById('avatar-error')
    };

    // Limpar mensagens de erro
    function clearErrors() {
        for (const key in errorElements)
        {
            errorElements[key].textContent = '';
        }
    }

    // Função para validar o formulário
    function validateForm(formData)
    {
        let isValid = true;

        // Validar nome
        if (!formData.get('name').trim())
        {
            isValid = false;
            errorElements.name.textContent = 'Por favor, informe seu nome.';
        }

        // Validar e-mail
        const email = formData.get('email');
        if (!email)
        {
            isValid = false;
            errorElements.email.textContent = 'Por favor, insira seu e-mail.';
        }
        else if (!isValidEmail(email))
        {
            isValid = false;
            errorElements.email.textContent = 'Por favor, insira um e-mail válido.';
        }

        // Validar tipo de ingresso
        if (!formData.get('type'))
        {
            isValid = false;
            errorElements.type.textContent = 'Por favor, selecione o tipo de ingresso.';
        }

        // Validar arquivo de avatar
        const avatarFile = document.getElementById('avatar').files[0];
        if (avatarFile)
        {
            if (!['image/jpeg', 'image/png'].includes(avatarFile.type))
            {
                isValid = false;
                alert('Formato de arquivo não suportado. Use JPG ou PNG.');
            }
        }

        return isValid;
    }

    // Validar formato de e-mail
    function isValidEmail(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar o formulário
    form.addEventListener('submit', function (event)
    {
        event.preventDefault();

        const formData = new FormData(form);

        if (validateForm(formData))
        {
            // Simular envio do formulário
            generateTicket(formData);
        }
        else
        {
            const firstErrorField = document.querySelector('.error-message:not(:empty)');
            if (firstErrorField)
            {
                const fieldId = firstErrorField.id.replace('-error', '');
                document.getElementById(fieldId).focus();
            }
        }
    });

    // Validação em tempo real
    form.addEventListener('input', function(event) {
        const target = event.target;
        const formData = new FormData(form);
        
        // Limpar mensagens de erro
        clearErrors();

        // Validar campo de e-mail em tempo real
        if (target.id === 'email' && target.value && !isValidEmail(target.value)) {
            errorElements.email.textContent = 'Por favor, informe um e-mail válido.';
        }
    });
});