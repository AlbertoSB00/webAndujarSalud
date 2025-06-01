// Formulario de Contacto - Andújar Salud
document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Configurar validación en tiempo real
    setupFormValidation();
    
    // Manejar envío del formulario
    contactForm.addEventListener('submit', handleFormSubmit);
    
    function setupFormValidation() {
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Limpiar errores mientras el usuario escribe
                clearFieldError(this);
            });
            
            // Estilos de focus
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.classList.contains('error')) {
                    this.style.borderColor = 'var(--border-light)';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar errores previos
        clearFieldError(field);
        
        // Validaciones específicas por campo
        switch(field.type) {
            case 'text':
                if (field.required && value === '') {
                    isValid = false;
                    errorMessage = 'Este campo es obligatorio';
                } else if (value.length > 0 && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Debe tener al menos 2 caracteres';
                }
                break;
                
            case 'email':
                if (field.required && value === '') {
                    isValid = false;
                    errorMessage = 'El email es obligatorio';
                } else if (value && !isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Introduce un email válido';
                }
                break;
                
            case 'tel':
                if (value && !isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Introduce un teléfono válido';
                }
                break;
                
            case 'textarea':
                if (field.required && value === '') {
                    isValid = false;
                    errorMessage = 'El mensaje es obligatorio';
                } else if (value.length > 0 && value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
                
            case 'checkbox':
                if (field.required && !field.checked) {
                    isValid = false;
                    errorMessage = 'Debes aceptar la política de privacidad';
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        
        // Crear o actualizar mensaje de error
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #e74c3c;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = 'var(--border-light)';
        field.style.boxShadow = 'none';
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
        return phoneRegex.test(phone);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showFormMessage('Por favor, corrige los errores antes de enviar el formulario.', 'error');
            // Scroll al primer error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Simular envío del formulario
        submitForm();
    }
    
    function submitForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carga
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        contactForm.classList.add('loading');
        
        // Simular envío (en una implementación real, aquí harías la petición al servidor)
        setTimeout(() => {
            // Simular éxito
            showFormMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Resetear formulario
            contactForm.reset();
            
            // Restaurar botón
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            contactForm.classList.remove('loading');
            
            // Limpiar errores
            inputs.forEach(input => clearFieldError(input));
            
        }, 2000);
    }
    
    function showFormMessage(message, type) {
        // Remover mensaje anterior si existe
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        
        const bgColor = type === 'success' ? '#d4edda' : '#f8d7da';
        const textColor = type === 'success' ? '#155724' : '#721c24';
        const borderColor = type === 'success' ? '#c3e6cb' : '#f5c6cb';
        const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
        
        messageElement.style.cssText = `
            background-color: ${bgColor};
            color: ${textColor};
            border: 1px solid ${borderColor};
            border-radius: var(--border-radius);
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            animation: slideIn 0.3s ease-out;
        `;
        
        messageElement.innerHTML = `<i class="fas fa-${icon}"></i>${message}`;
        
        // Insertar al inicio del formulario
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Auto-remover después de 5 segundos si es mensaje de éxito
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.style.animation = 'slideOut 0.3s ease-out';
                    setTimeout(() => messageElement.remove(), 300);
                }
            }, 5000);
        }
        
        // Scroll al mensaje
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Añadir animaciones CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        .form-message {
            animation: slideIn 0.3s ease-out;
        }
        
        /* Estilos responsive para el formulario */
        @media (max-width: 768px) {
            #contactForm {
                padding: 2rem 1.5rem !important;
            }
            
            #contactForm > div:first-of-type,
            #contactForm > div:nth-of-type(2) {
                grid-template-columns: 1fr !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Formulario de contacto inicializado correctamente');
});
