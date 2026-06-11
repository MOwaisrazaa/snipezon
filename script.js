/* ==========================================================================
   SNIPEZON INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Sticky Header Logic --- */
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- Mobile Navigation Menu Drawer --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        mainNav.classList.toggle('mobile-active');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-active')) {
                toggleMenu();
            }
        });
    });

    /* --- Active Link Highlight on Scroll --- */
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- Scroll Reveal Intersection Observer --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // Viewport
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters screen fully
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* --- Live Counter Animation --- */
    const countElement = document.getElementById('count-conversations');
    if (countElement) {
        let currentCount = 11840;
        const targetCount = 12480;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / (targetCount - currentCount)));
        
        // Slow increment rate so it renders nicely
        const counterInterval = setInterval(() => {
            currentCount += 4;
            countElement.textContent = currentCount.toLocaleString();
            if (currentCount >= targetCount) {
                clearInterval(counterInterval);
                countElement.textContent = targetCount.toLocaleString();
            }
        }, 10);
    }

    /* --- Chatbot Simulator State Machine --- */
    const chatContainer = document.getElementById('chat-messages-container');
    const chatInputForm = document.getElementById('chat-input-form');
    const chatInputField = document.getElementById('chat-input');
    const quickReplies = document.getElementById('quick-replies');

    // Helper to scroll to bottom of chat
    const scrollToBottom = () => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    // Helper to format timestamp
    const getFormattedTime = () => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 12 instead of 0
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    // Append a message to the chat layout
    const appendMessage = (sender, text) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('msg', sender === 'user' ? 'user-msg' : 'bot-msg');
        
        messageDiv.innerHTML = `
            <div class="msg-bubble">${text}</div>
            <span class="msg-time">${getFormattedTime()}</span>
        `;
        
        chatContainer.appendChild(messageDiv);
        scrollToBottom();
    };

    // Append writing status simulator
    const appendTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('msg', 'bot-msg', 'typing-indicator-wrapper');
        typingDiv.innerHTML = `
            <div class="msg-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <span class="msg-time">Typing...</span>
        `;
        chatContainer.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    };

    // Handles the bot logic responses
    const handleBotResponse = (userQuery) => {
        const indicator = appendTypingIndicator();
        
        // Normalize search term
        const query = userQuery.toLowerCase().trim();

        // Simulate network latency
        setTimeout(() => {
            // Remove typing bubble
            indicator.remove();

            let replyText = "";

            if (query.includes('whatsapp') || query.includes('api')) {
                replyText = "Our <strong>WhatsApp Business API setup</strong> enables automated catalogs, broadcast campaigns, order tracking, and 24/7 automated support. Connect your business database to chat in seconds! Want to schedule a live demo? Click the WhatsApp icon on the bottom right of the screen.";
            } else if (query.includes('offer') || query.includes('free') || query.includes('accounting') || query.includes('gul plaza')) {
                replyText = "Indeed! We are offering <strong>3 Months of FREE Access</strong> to our web-based accounting and billing software. This contains full inventory trackers and sales logs. To claim it, scroll down slightly and submit the form in the 'Special Offer' card.";
            } else if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('address') || query.includes('office')) {
                replyText = "You can contact Snipezon instantly at <strong>+92 312 2261919</strong> (WhatsApp/Call) or email us at <strong>ceo@snipezon.com</strong>. Drop by our office: Shop No. F19, 1st Floor, Dary Craft Tower, Saddar, Karachi.";
            } else if (query.includes('website') || query.includes('web') || query.includes('static') || query.includes('dynamic') || query.includes('e-commerce') || query.includes('ecommerce')) {
                replyText = "We build lightning-fast, high-performing websites. We offer <strong>Static Web portals</strong> starting from simple portfolios to full scale <strong>Dynamic E-commerce setups</strong> with custom shopping checkout flows. Let us build your web presence!";
            } else if (query.includes('bot') || query.includes('chatbot') || query.includes('sales')) {
                replyText = "We build custom <strong>Sales and Customer Care Chatbots</strong> for websites, WhatsApp, and Instagram. They use smart language logic to convert visitors to leads automatically. We can build one specifically for your services!";
            } else {
                replyText = "Thank you for reaching out! Snipezon provides customized software, dynamic websites, e-commerce stores, WhatsApp API triggers, and AI chatbots. How about discussing your project requirements via WhatsApp at +92 312 2261919?";
            }

            appendMessage('bot', replyText);
        }, 1200); // 1.2 second simulated response delay
    };

    // Chat Form Trigger
    chatInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInputField.value.trim();
        if (!message) return;
        
        appendMessage('user', message);
        chatInputField.value = '';
        
        handleBotResponse(message);
    });

    // Quick Replies Click Action
    quickReplies.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply-btn')) {
            const buttonText = e.target.textContent;
            appendMessage('user', buttonText);
            handleBotResponse(buttonText);
        }
    });


    /* --- Toast Notification Controller --- */
    const toast = document.getElementById('toast-notification');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');

    const showToast = (title, message) => {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        toast.className = 'toast-visible';
        
        // Hide after 4.5 seconds
        setTimeout(() => {
            toast.className = 'toast-hidden';
        }, 4500);
    };

    /* --- Form Submissions Handler --- */
    const offerForm = document.getElementById('offer-claim-form');
    const contactForm = document.getElementById('contact-us-form');

    // Claim Offer form submit
    if (offerForm) {
        offerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const shopName = document.getElementById('shop-name').value;
            const ownerName = document.getElementById('owner-name').value;
            const phoneNum = document.getElementById('offer-phone').value;

            // Log details (or ready for database transfer)
            console.log("Offer Claimed: ", { shopName, ownerName, phoneNum });

            // Display Toast feedback
            showToast(
                "Offer Claimed Successfully!", 
                `Thanks ${ownerName}! We will message you on WhatsApp (${phoneNum}) within 24 hours with your login.`
            );

            // Reset Form fields
            offerForm.reset();
        });
    }

    // Message contact form submit
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('contact-name').value;
            const emailAddr = document.getElementById('contact-email').value;
            const msgContent = document.getElementById('contact-message').value;

            console.log("Contact Message Sent: ", { fullName, emailAddr, msgContent });

            // Display Toast feedback
            showToast(
                "Message Sent!", 
                `Thank you ${fullName}. We have received your query and will reply to ${emailAddr} shortly.`
            );

            // Reset Form fields
            contactForm.reset();
        });
    }

});
