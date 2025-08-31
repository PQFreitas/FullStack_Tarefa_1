document.addEventListener('DOMContentLoaded', function()
{
    const form = document.getElementById('ticketForm');

    // Função para validar o formulário
    function validateForm(formData)
    {
        let isValid = true;

        // Validar nome
        if (!formData.get('name').trim())
        {
            isValid = false;
            alert('Por favor, insira seu nome.');
        }

        // Validar e-mail
        const email = formData.get('email');
        if (!email)
        {
            isValid = false;
            alert('Por favor, insira seu e-mail.');
        }
        else if (!isValidEmail(email))
        {
            isValid = false;
            alert('Por favor, insira um e-mail válido.');
        }

        // Validar tipo de ingresso
        if (!formData.get('type'))
        {
            isValid = false;
            alert('Por favor, selecione o tipo de ingresso.');
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

    form.addEventListener('submit', function (event)
    {
        event.preventDefault();

        const formData = new FormData(form);

        if (validateForm(formData))
        {
            // Simular envio do formulário
            alert('Formulário enviado com sucesso!');
            form.reset();
        }
        else
        {
            console.log('Formulário inválido. Corrija os erros e tente novamente.');
        }
    });

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field =>
    {
        field.setAttribute('aria-required', 'true');
            
        // Adicionar dica visual para campos obrigatórios
        const label = form.querySelector(`label[for="${field.id}"]`);
        if (label && !label.querySelector('.required-asterisk')) {
            label.innerHTML += '<span class="required-asterisk" aria-hidden="true"> *</span>';
        }
    });

});