const ticketPreview = document.getElementById('ticketPreview');

const typeNames =
{
    'estudante': 'Estudante',
    'profissional': 'Profissional',
    'vip': 'VIP',
    'palestrante': 'Palestrante'
};

// Gerar Ticket
function generateTicket(formData)
{
    const name = formData.get('name');
    const email = formData.get('email');
    const type = formData.get('type');
    const avatarFile = document.getElementById('avatar').files[0];

    let avatarUrl = '';
    if (avatarFile)
    {
        avatarUrl = URL.createObjectURL(avatarFile);
    }

    const ticketHTML = `
        <div class="ticket">
            <div class="ticket-header">
                <h3>Conferência ABC</h3>
            </div>
            <div class="ticket-body">
                ${avatarUrl ? `<img src="${avatarUrl}" alt="Avatar de ${name}" class="ticket-avatar">` : ''}
                <div class="ticket-info">
                    <strong>Nome:</strong> <span>${name}</span>
                </div>
                <div class="ticket-info">
                    <strong>E-mail:</strong> <span>${email}</span>
                </div>
                <div class="ticket-info">
                    <strong>Tipo:</strong> <span>${typeNames[type]}</span>
                </div>
            </div>
            <div class="ticket-footer">
                <p>Apresente este ingresso na entrada do evento</p>
                <p>ID: ${Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
            </div>        </div>
    `;

    ticketPreview.innerHTML = ticketHTML;
}