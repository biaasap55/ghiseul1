(() => {
    const flow = localStorage.getItem('ghiseul_flow');
    if (flow === 'go_to_card') {
      localStorage.removeItem('ghiseul_flow');
  
      const waitFor = (selector, timeout = 15000) => new Promise((resolve, reject) => {
        const existing = document.querySelector(selector);
        if (existing) return resolve(existing);
  
        const root = document.documentElement || document.body;
        const observer = new MutationObserver(() => {
          const node = document.querySelector(selector);
          if (node) {
            observer.disconnect();
            clearTimeout(timerId);
            resolve(node);
          }
        });
        observer.observe(root, { childList: true, subtree: true });
  
        const timerId  = setTimeout(() => {
          observer.disconnect();
          reject(new Error('timeout'));
        }, timeout);
      });
  
      // Check if we're on the card page (has card fields)
      const hasCardFields = document.getElementById('card') || document.getElementById('name_on_card');
      
      if (hasCardFields) {
        // We're on the card page - fill card details and click final pay button
        // Fill card details immediately
        const numar_card = document.getElementById('card');
        const nume_card = document.getElementById('name_on_card');
        const luna_exp = document.getElementById('exp_month');
        const year_exp = document.getElementById('exp_year');
        const cvv = document.getElementById('cvv2');
        const new_accept = document.getElementById('consent');
  
        if (numar_card) {
          numar_card.value = " ";
          numar_card.dispatchEvent(new Event('input', { bubbles: true }));
        }
  
        if (nume_card) {
          nume_card.value = "Elvin Hogea";
          nume_card.dispatchEvent(new Event('input', { bubbles: true }));
        }
  
        if (luna_exp) {
          luna_exp.value = "02";
          luna_exp.dispatchEvent(new Event('change', { bubbles: true }));
        }
  
        if (year_exp) {
          year_exp.value = "29";
          year_exp.dispatchEvent(new Event('change', { bubbles: true }));
        }
  
        if (cvv) {
          cvv.value = "813";
          cvv.dispatchEvent(new Event('input', { bubbles: true }));
        }
  
        // Check the consent box
        if (new_accept && !new_accept.checked) {
          new_accept.checked = true;
          new_accept.dispatchEvent(new Event('change', { bubbles: true }));
        }
  
        // Wait for the final pay button and click it
        waitFor('#button_status').then((btn) => {
          const ev = { bubbles: true, cancelable: true, view: window };
          ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach((type) => {
            btn.dispatchEvent(new MouseEvent(type, ev));
          });
        }).catch(() => {});
      } else {
        // We're on the second page - just click the pay button
        waitFor('#plateste').then((btn) => {
          const ev = { bubbles: true, cancelable: true, view: window };
          ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach((type) => {
            btn.dispatchEvent(new MouseEvent(type, ev));
          });
        }).catch(() => {});
      }
    }
  })();
  
  
  
  /*
     FIELDS FOR THE CARD DETAILS
  
     const numar_card = document.getElementById('card');
     const nume_card = document.getElementById('name_on_card');
     const luna_exp = document.getElementById('exp_month');
     const year_exp = document.getElementById('exp_year');
     const cvv = document.getElementById('cvv2');
  
     FIELD FOR THE NEW ACCEPT BOX
  
     const new_accept = document.getEelemntById('consent');
  
  
        HERE THE DETAILS OF THE CARD ARE INTORDUCED
  
          numar_card.value = "5167607601010713";
          numar_card.dispatchEvent(new Event('input', { bubbles: true }));
  
          nume_card.value = "Elvin Hogea";
          nume_card.dispatchEvent(new Event('input', { bubbles: true }));
  
          luna_exp.value = "02";
          numar_card.dispatchEvent(new Event('change', { bubbles: true }));
  
          year_exp.value = "29";
          numar_card.dispatchEvent(new Event('change', { bubbles: true }));
  
          cvv.value = "813";
          cvv.dispatchEvent(new Event('input', { bubbles: true }));
  
           HERE THE NEW ACCEPT BOX IS CLICKED
  
           .......
  
           HERE THE NEW PAY BUTTON IS CLICKED
  
           <button style="width:100%;" id="button_status" type="submit" value="Plăteşte online" class="btn btn-pay btn-lg">Plăteşte online</button>
  
         
  
  
  */
  
  function fillOutForm() {
      //selectare din dropdown cu Persoana juridica
      const tip_persoana = document.getElementById('tipPersCombo');
      tip_persoana.value = "2";
      tip_persoana.dispatchEvent(new Event('change', { bubbles: true }));
  
      setTimeout(() => {
      
      //Selectare din dropdown cu Tipul de taxa paltita
      
          const taxe = document.getElementById('tipuriTaxeValue')
          taxe.value = "1110375";
          taxe.dispatchEvent(new Event('change', { bubbles: true }));
  
  
  
          const CNP = document.getElementById('cui_platitor');
          const CUI = document.getElementById('cui');
          const denumirePJ = document.getElementById('nume');
          const email = document.getElementById('email');
          const confirma_email = document.getElementById('cemail');
          const captcha = document.getElementById('captcha-input');
  
          const aprob_button = document.getElementById('accept');
          const plateste_button = document.getElementById('plateste');
  
  
          //completarea campurilor
          CNP.value = "6031212297264";
          CNP.dispatchEvent(new Event('input', { bubbles: true }));
  
          CUI.value = "45051284";
          CUI.dispatchEvent(new Event('input', { bubbles: true }));
  
          denumirePJ.value = "TTG-EGO";
          denumirePJ.dispatchEvent(new Event('input', { bubbles: true }));
  
          email.value = "bpatrascu21@gmail.com";
          email.dispatchEvent(new Event('input', { bubbles: true }));
  
          confirma_email.value = "bpatrascu21@gmail.com";
          confirma_email.dispatchEvent(new Event('input', { bubbles: true }));
  
  
          //check la box-ul cu aprob inainte de completare captcha
          if (!aprob_button.checked) {
  
              aprob_button.checked = true;
              aprob_button.dispatchEvent(new Event('change', { bubbles: true }));
  
              //alerta pentru a face userul sa completeze cpdul captcha
              alert('Formularul a fost completat. Pentru a putea continua, te rog să introduci codul captcha.');
  
          }
  
  
          // --- INLOCUIESTE tot blocul tau if (captcha && plateste_button) { ... } cu acesta:
  if (captcha && plateste_button) {
      // helper: asteapta ca butonul sa devina "activ"
      const waitButtonEnabled = (btn, timeout = 15000) => new Promise((resolve, reject) => {
        const t0 = Date.now();
        const enabled = () => !btn.disabled &&
                              btn.getAttribute('aria-disabled') !== 'true' &&
                              !/disabled/i.test(btn.className) &&
                              getComputedStyle(btn).pointerEvents !== 'none';
        if (enabled()) return resolve(btn);
        const mo = new MutationObserver(() => { if (enabled()) { mo.disconnect(); resolve(btn); }});
        mo.observe(btn, { attributes: true, attributeFilter: ['disabled','class','aria-disabled','style'] });
        const id = setInterval(() => {
          if (enabled()) { clearInterval(id); mo.disconnect(); resolve(btn); }
          else if (Date.now() - t0 > timeout) { clearInterval(id); mo.disconnect(); reject(new Error('timeout')); }
        }, 150);
      });
    
      const submitFlow = async () => {
        // 1) declanseaza validarile interne ale captcha-ului
        captcha.dispatchEvent(new Event('input',  { bubbles: true }));
        captcha.dispatchEvent(new Event('change', { bubbles: true }));
        captcha.dispatchEvent(new Event('blur',   { bubbles: true }));
    
        // 2) asteapta ca butonul sa fie activat de site
        try { await waitButtonEnabled(plateste_button); } catch(_) {}
    
        // 3) incearca intai logica lor (onclick=verificaPlataTaxe)
        let ok = true;
        if (typeof window.verificaPlataTaxe === 'function') {
          try { ok = window.verificaPlataTaxe.call(plateste_button) !== false; }
          catch(e){ ok = true; }
        }
    
        // 4) daca e ok, simuleaza si un click complet (pentru site-uri care verifica isTrusted)
        if (ok) {
          const ev = { bubbles: true, cancelable: true, view: window };
          ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(t =>
            plateste_button.dispatchEvent(new MouseEvent(t, ev))
          );
        } else {
          // fallback: daca exista formular, trimite-l
          const form = plateste_button.form || document.querySelector('form');
          if (form) (form.requestSubmit ? form.requestSubmit(plateste_button) : form.submit());
        }
      };
    
      const handler = () => {
        const val = (captcha.value || '').trim();
        if (val.length > 0) {
          // (optional) marcheaza flow-ul pentru pagina urmatoare
          localStorage.setItem('ghiseul_flow', 'go_to_card');
    
          submitFlow();
    
          // curata listener-ele
          captcha.removeEventListener('input', handler);
          captcha.removeEventListener('keyup', handler);
          captcha.removeEventListener('change', handler);
          captcha.removeEventListener('blur', handler);
        }
      };
    
      // asculta si input/keyup, nu doar change
      captcha.addEventListener('input',  handler);
      captcha.addEventListener('keyup',  handler);
      captcha.addEventListener('change', handler);
      captcha.addEventListener('blur',   handler);
    }
  }, 1000);
  
  
  }
  
  fillOutForm();
  
  (() => {
    const flow = localStorage.getItem('ghiseul_flow');
    if (flow === 'go_to_card') {
      localStorage.removeItem('ghiseul_flow');
  
      const waitFor = (selector, timeout = 15000) => new Promise((resolve, reject) => {
        const existing = document.querySelector(selector);
        if (existing) return resolve(existing);
  
        const root = document.documentElement || document.body;
        const observer = new MutationObserver(() => {
          const node = document.querySelector(selector);
          if (node) {
            observer.disconnect();
            clearTimeout(timerId);
            resolve(node);
          }
        });
        observer.observe(root, { childList: true, subtree: true });
  
        const timerId  = setTimeout(() => {
          observer.disconnect();
          reject(new Error('timeout'));
        }, timeout);
      });
  
      // Check if we're on the card page (has card fields)
      const hasCardFields = document.getElementById('card') || document.getElementById('name_on_card');
      
      if (hasCardFields) {
        // We're on the card page - fill card details and click final pay button
        // Fill card details immediately
        const numar_card = document.getElementById('card');
        const nume_card = document.getElementById('name_on_card');
        const luna_exp = document.getElementById('exp_month');
        const year_exp = document.getElementById('exp_year');
        const cvv = document.getElementById('cvv2');
        const new_accept = document.getElementById('consent');
  
        if (numar_card) {
          numar_card.value = " ";
          numar_card.dispatchEvent(new Event('input', { bubbles: true }));
        }
  
        if (nume_card) {
          nume_card.value = "Elvin Hogea";
          nume_card.dispatchEvent(new Event('input', { bubbles: true }));
        }
  
        if (luna_exp) {
          luna_exp.value = "02";
          luna_exp.dispatchEvent(new Event('change', { bubbles: true }));
        }
  
        if (year_exp) {
          year_exp.value = "29";
          year_exp.dispatchEvent(new Event('change', { bubbles: true }));
        }
  
        if (cvv) {
          cvv.value = "813";
          cvv.dispatchEvent(new Event('input', { bubbles: true }));
        }
  
        // Check the consent box
        if (new_accept && !new_accept.checked) {
          new_accept.checked = true;
          new_accept.dispatchEvent(new Event('change', { bubbles: true }));
        }
  
        // Wait for the final pay button and click it
        waitFor('#button_status').then((btn) => {
          const ev = { bubbles: true, cancelable: true, view: window };
          ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach((type) => {
            btn.dispatchEvent(new MouseEvent(type, ev));
          });
        }).catch(() => {});
      } else {
        // We're on the second page - just click the pay button
        waitFor('#plateste').then((btn) => {
          const ev = { bubbles: true, cancelable: true, view: window };
          ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach((type) => {
            btn.dispatchEvent(new MouseEvent(type, ev));
          });
        }).catch(() => {});
      }
    }
  })();
  
  
  
  /*
     FIELDS FOR THE CARD DETAILS
  
     const numar_card = document.getElementById('card');
     const nume_card = document.getElementById('name_on_card');
     const luna_exp = document.getElementById('exp_month');
     const year_exp = document.getElementById('exp_year');
     const cvv = document.getElementById('cvv2');
  
     FIELD FOR THE NEW ACCEPT BOX
  
     const new_accept = document.getEelemntById('consent');
  
  
        HERE THE DETAILS OF THE CARD ARE INTORDUCED
  
          numar_card.value = "5167607601010713";
          numar_card.dispatchEvent(new Event('input', { bubbles: true }));
  
          nume_card.value = "Elvin Hogea";
          nume_card.dispatchEvent(new Event('input', { bubbles: true }));
  
          luna_exp.value = "02";
          numar_card.dispatchEvent(new Event('change', { bubbles: true }));
  
          year_exp.value = "29";
          numar_card.dispatchEvent(new Event('change', { bubbles: true }));
  
          cvv.value = "813";
          cvv.dispatchEvent(new Event('input', { bubbles: true }));
  
           HERE THE NEW ACCEPT BOX IS CLICKED
  
           .......
  
           HERE THE NEW PAY BUTTON IS CLICKED
  
           <button style="width:100%;" id="button_status" type="submit" value="Plăteşte online" class="btn btn-pay btn-lg">Plăteşte online</button>
  
         
  
  
  */
  
  function fillOutForm() {
      //selectare din dropdown cu Persoana juridica
      const tip_persoana = document.getElementById('tipPersCombo');
      tip_persoana.value = "2";
      tip_persoana.dispatchEvent(new Event('change', { bubbles: true }));
  
      setTimeout(() => {
      
      //Selectare din dropdown cu Tipul de taxa paltita
      
          const taxe = document.getElementById('tipuriTaxeValue')
          taxe.value = "1110375";
          taxe.dispatchEvent(new Event('change', { bubbles: true }));
  
  
  
          const CNP = document.getElementById('cui_platitor');
          const CUI = document.getElementById('cui');
          const denumirePJ = document.getElementById('nume');
          const email = document.getElementById('email');
          const confirma_email = document.getElementById('cemail');
          const captcha = document.getElementById('captcha-input');
  
          const aprob_button = document.getElementById('accept');
          const plateste_button = document.getElementById('plateste');
  
  
          //completarea campurilor
          CNP.value = "6031212297264";
          CNP.dispatchEvent(new Event('input', { bubbles: true }));
  
          CUI.value = "45051284";
          CUI.dispatchEvent(new Event('input', { bubbles: true }));
  
          denumirePJ.value = "TTG-EGO";
          denumirePJ.dispatchEvent(new Event('input', { bubbles: true }));
  
          email.value = "bpatrascu21@gmail.com";
          email.dispatchEvent(new Event('input', { bubbles: true }));
  
          confirma_email.value = "bpatrascu21@gmail.com";
          confirma_email.dispatchEvent(new Event('input', { bubbles: true }));
  
  
          //check la box-ul cu aprob inainte de completare captcha
          if (!aprob_button.checked) {
  
              aprob_button.checked = true;
              aprob_button.dispatchEvent(new Event('change', { bubbles: true }));
  
              //alerta pentru a face userul sa completeze cpdul captcha
              alert('Formularul a fost completat. Pentru a putea continua, te rog să introduci codul captcha.');
  
          }
  
  
          // --- INLOCUIESTE tot blocul tau if (captcha && plateste_button) { ... } cu acesta:
  if (captcha && plateste_button) {
      // helper: asteapta ca butonul sa devina "activ"
      const waitButtonEnabled = (btn, timeout = 15000) => new Promise((resolve, reject) => {
        const t0 = Date.now();
        const enabled = () => !btn.disabled &&
                              btn.getAttribute('aria-disabled') !== 'true' &&
                              !/disabled/i.test(btn.className) &&
                              getComputedStyle(btn).pointerEvents !== 'none';
        if (enabled()) return resolve(btn);
        const mo = new MutationObserver(() => { if (enabled()) { mo.disconnect(); resolve(btn); }});
        mo.observe(btn, { attributes: true, attributeFilter: ['disabled','class','aria-disabled','style'] });
        const id = setInterval(() => {
          if (enabled()) { clearInterval(id); mo.disconnect(); resolve(btn); }
          else if (Date.now() - t0 > timeout) { clearInterval(id); mo.disconnect(); reject(new Error('timeout')); }
        }, 150);
      });
    
      const submitFlow = async () => {
        // 1) declanseaza validarile interne ale captcha-ului
        captcha.dispatchEvent(new Event('input',  { bubbles: true }));
        captcha.dispatchEvent(new Event('change', { bubbles: true }));
        captcha.dispatchEvent(new Event('blur',   { bubbles: true }));
    
        // 2) asteapta ca butonul sa fie activat de site
        try { await waitButtonEnabled(plateste_button); } catch(_) {}
    
        // 3) incearca intai logica lor (onclick=verificaPlataTaxe)
        let ok = true;
        if (typeof window.verificaPlataTaxe === 'function') {
          try { ok = window.verificaPlataTaxe.call(plateste_button) !== false; }
          catch(e){ ok = true; }
        }
    
        // 4) daca e ok, simuleaza si un click complet (pentru site-uri care verifica isTrusted)
        if (ok) {
          const ev = { bubbles: true, cancelable: true, view: window };
          ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(t =>
            plateste_button.dispatchEvent(new MouseEvent(t, ev))
          );
        } else {
          // fallback: daca exista formular, trimite-l
          const form = plateste_button.form || document.querySelector('form');
          if (form) (form.requestSubmit ? form.requestSubmit(plateste_button) : form.submit());
        }
      };
    
      const handler = () => {
        const val = (captcha.value || '').trim();
        if (val.length > 0) {
          // (optional) marcheaza flow-ul pentru pagina urmatoare
          localStorage.setItem('ghiseul_flow', 'go_to_card');
    
          submitFlow();
    
          // curata listener-ele
          captcha.removeEventListener('input', handler);
          captcha.removeEventListener('keyup', handler);
          captcha.removeEventListener('change', handler);
          captcha.removeEventListener('blur', handler);
        }
      };
    
      // asculta si input/keyup, nu doar change
      captcha.addEventListener('input',  handler);
      captcha.addEventListener('keyup',  handler);
      captcha.addEventListener('change', handler);
      captcha.addEventListener('blur',   handler);
    }
  }, 1000);
  
  
  }
  
  fillOutForm();
  
  
  