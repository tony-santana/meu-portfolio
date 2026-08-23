/**
 * ==============================================
 * JAVASCRIPT - PORTFÓLIO PESSOAL
 * Funcionalidades:
 * 1. Menu responsivo (hambúrguer)
 * 2. Alternância de tema claro/escuro
 * 3. Validação do formulário de contato
 * 4. Simulação de envio de mensagem
 * ==============================================
 */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {

    // ==============================================
    // 1. MENU RESPONSIVO (HAMBÚRGUER)
    // ==============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Ao clicar no botão, alterna o menu
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
        });

        // Fecha o menu ao clicar em qualquer link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            });
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    // ==============================================
    // 2. ALTERNÂNCIA DE TEMA (CLARO/ESCURO)
    // ==============================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Verifica se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    } else {
        // Verifica preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    }

    // Alterna o tema ao clicar no botão
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ==============================================
    // 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    // ==============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Seleciona os campos
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');

            // Seleciona as mensagens de erro
            const nomeError = document.getElementById('nomeError');
            const emailError = document.getElementById('emailError');
            const mensagemError = document.getElementById('mensagemError');

            // Reseta os erros
            nomeError.classList.remove('show');
            emailError.classList.remove('show');
            mensagemError.classList.remove('show');
            nome.classList.remove('error');
            email.classList.remove('error');
            mensagem.classList.remove('error');

            let isValid = true;

            // Validação do NOME
            if (nome.value.trim() === '') {
                nomeError.classList.add('show');
                nome.classList.add('error');
                isValid = false;
            }

            // Validação do E-MAIL
            if (email.value.trim() === '') {
                emailError.classList.add('show');
                email.classList.add('error');
                isValid = false;
            } else {
                // Expressão regular para validar e-mail
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email.value.trim())) {
                    emailError.textContent = 'Por favor, insira um e-mail válido (ex: usuario@dominio.com).';
                    emailError.classList.add('show');
                    email.classList.add('error');
                    isValid = false;
                }
            }

            // Validação da MENSAGEM
            if (mensagem.value.trim() === '') {
                mensagemError.classList.add('show');
                mensagem.classList.add('error');
                isValid = false;
            }

            // Se for válido, simula o envio
            if (isValid) {
                // Alerta de sucesso
                alert('✅ Mensagem enviada com sucesso!\n\nObrigado pelo contato, ' + nome.value.trim() + '!');

                // Limpa os campos
                nome.value = '';
                email.value = '';
                mensagem.value = '';

                // Remove classes de erro
                nome.classList.remove('error');
                email.classList.remove('error');
                mensagem.classList.remove('error');

                // Mensagem de sucesso no formulário
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '✅ Mensagem enviada com sucesso!';
                successMessage.style.cssText = `
                    background-color: #2ecc71;
                    color: #fff;
                    padding: 15px;
                    border-radius: 4px;
                    margin-top: 20px;
                    text-align: center;
                    font-weight: 600;
                `;

                // Remove mensagens antigas
                const oldSuccess = contactForm.querySelector('.success-message');
                if (oldSuccess) {
                    oldSuccess.remove();
                }

                contactForm.appendChild(successMessage);

                // Remove a mensagem após 5 segundos
                setTimeout(function() {
                    if (successMessage.parentNode) {
                        successMessage.remove();
                    }
                }, 5000);
            }
        });
    }

    // ==============================================
    // 4. VALIDAÇÃO EM TEMPO REAL (ENQUANTO DIGITA)
    // ==============================================
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    // Validação do nome em tempo real
    if (nomeInput) {
        nomeInput.addEventListener('input', function() {
            const nomeError = document.getElementById('nomeError');
            if (this.value.trim() !== '') {
                nomeError.classList.remove('show');
                this.classList.remove('error');
            }
        });
    }

    // Validação do email em tempo real
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (this.value.trim() !== '' && emailRegex.test(this.value.trim())) {
                emailError.classList.remove('show');
                this.classList.remove('error');
            }
        });
    }

    // Validação da mensagem em tempo real
    if (mensagemInput) {
        mensagemInput.addEventListener('input', function() {
            const mensagemError = document.getElementById('mensagemError');
            if (this.value.trim() !== '') {
                mensagemError.classList.remove('show');
                this.classList.remove('error');
            }
        });
    }

    console.log('🚀 Portfólio carregado com sucesso!');
});