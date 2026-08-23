/**
 * ==============================================
 * JAVASCRIPT - PORTFÓLIO PESSOAL
 * ==============================================
 */

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ JavaScript carregado!');

    // ==============================================
    // MENU RESPONSIVO
    // ==============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // ==============================================
    // TEMA CLARO/ESCURO - VERSÃO SIMPLIFICADA
    // ==============================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Adiciona a classe dark-mode se estiver salvo
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // Quando clicar no botão
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

    // ==============================================
    // VALIDAÇÃO DO FORMULÁRIO
    // ==============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');

            const nomeError = document.getElementById('nomeError');
            const emailError = document.getElementById('emailError');
            const mensagemError = document.getElementById('mensagemError');

            nomeError.classList.remove('show');
            emailError.classList.remove('show');
            mensagemError.classList.remove('show');
            nome.classList.remove('error');
            email.classList.remove('error');
            mensagem.classList.remove('error');

            let isValid = true;

            if (nome.value.trim() === '') {
                nomeError.classList.add('show');
                nome.classList.add('error');
                isValid = false;
            }

            if (email.value.trim() === '') {
                emailError.classList.add('show');
                email.classList.add('error');
                isValid = false;
            } else {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email.value.trim())) {
                    emailError.textContent = 'E-mail inválido. Ex: usuario@dominio.com';
                    emailError.classList.add('show');
                    email.classList.add('error');
                    isValid = false;
                }
            }

            if (mensagem.value.trim() === '') {
                mensagemError.classList.add('show');
                mensagem.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                alert('✅ Mensagem enviada com sucesso!\n\nObrigado, ' + nome.value.trim() + '!');
                
                nome.value = '';
                email.value = '';
                mensagem.value = '';
                
                nome.classList.remove('error');
                email.classList.remove('error');
                mensagem.classList.remove('error');
            }
        });
    }
});