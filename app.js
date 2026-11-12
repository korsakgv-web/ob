/* Favicon / apple-touch-icon dynamic setup (canvas fallback if PNG missing) */
window.addEventListener('DOMContentLoaded', function() {
  var appIcon = document.getElementById('appIcon');
  var favIcon = document.getElementById('favIcon');
  var canvas = document.createElement('canvas');
  canvas.width = 180; canvas.height = 180;
  var ctx = canvas.getContext('2d');

  var bgGrad = ctx.createLinearGradient(0, 0, 0, 180);
  bgGrad.addColorStop(0, '#18181b');
  bgGrad.addColorStop(1, '#27272a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 180, 180);
  ctx.strokeStyle = '#3f3f46';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, 168, 168);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(42, 24); ctx.lineTo(42, 152);
  ctx.moveTo(56, 24); ctx.lineTo(56, 152);
  for (var y = 38; y < 140; y += 16) {
    ctx.moveTo(42, y); ctx.lineTo(56, y + 8);
    ctx.moveTo(56, y + 8); ctx.lineTo(42, y + 16);
  }
  ctx.moveTo(18, 40); ctx.lineTo(160, 40);
  ctx.moveTo(22, 31); ctx.lineTo(152, 31);
  for (var x = 60; x < 148; x += 16) {
    ctx.moveTo(x, 40); ctx.lineTo(x + 8, 31);
    ctx.moveTo(x + 8, 31); ctx.lineTo(x + 16, 40);
  }
  ctx.moveTo(49, 15); ctx.lineTo(49, 40);
  ctx.moveTo(49, 15); ctx.lineTo(24, 31);
  ctx.moveTo(49, 15); ctx.lineTo(132, 31);
  ctx.moveTo(138, 40); ctx.lineTo(138, 70);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.fillRect(18, 36, 16, 12);

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(132, 70); ctx.lineTo(144, 70);
  ctx.lineTo(141, 79); ctx.lineTo(135, 79);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(138, 79); ctx.lineTo(138, 84);
  ctx.arc(135, 84, 3.5, 0, Math.PI * 1.15, false);
  ctx.stroke();

  var hatGrad = ctx.createLinearGradient(45, 86, 150, 150);
  hatGrad.addColorStop(0, '#fef08a');
  hatGrad.addColorStop(0.45, '#f59e0b');
  hatGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = hatGrad;
  ctx.beginPath();
  ctx.arc(82, 112, 34, Math.PI, 0, false);
  ctx.arc(82, 112, 26, 0, Math.PI, true);
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2;
  ctx.stroke();

  var dataUrl = canvas.toDataURL('image/png');
  if (appIcon) appIcon.href = dataUrl;
  if (favIcon) favIcon.href = dataUrl;
});

/* ============================================
   UI HELPERS — Modals, Toasts, Form Validation
   ============================================ */

/* Show a toast notification */
window.showToast = function(message, type, duration) {
  if (type === undefined) type = 'info';
  if (duration === undefined) duration = 4000;
  var container = document.getElementById('toastContainer');
  if (!container) return;
  var el = document.createElement('div');
  el.className = 'toast ' + type;
  el.setAttribute('role', 'alert');
  el.setAttribute('aria-live', 'polite');
  el.textContent = message;
  container.appendChild(el);
  setTimeout(function() {
    el.style.opacity = '0';
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
  }, duration);
};

/* Open a modal by id — adds .active, blocks body scroll, traps focus */
window.openModal = function(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  document.body.classList.add('modal-open');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  var firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) firstFocusable.focus();
};

/* Close a modal by id — removes .active, restores body scroll */
window.closeModal = function(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  var modals = document.querySelectorAll('.modal-backdrop.active');
  if (modals.length === 0) {
    document.body.classList.remove('modal-open');
  }
};

/* Close all modals */
window.closeAllModals = function() {
  document.querySelectorAll('.modal-backdrop.active').forEach(function(m) {
    m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.classList.remove('modal-open');
};

/* Global Esc handler — closes topmost modal */
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var active = document.querySelector('.modal-backdrop.active');
    if (active) {
      var id = active.id;
      if (id) closeModal(id);
    }
  }
});

/* Form field validation helper */
window.setFieldError = function(fieldId, show, message) {
  var field = document.getElementById(fieldId);
  if (!field) return;
  var group = field.closest('.form-group');
  if (show) {
    field.parentElement.classList.add('form-field--error');
    var msg = field.parentElement.querySelector('.form-error-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'form-error-msg';
      field.parentElement.appendChild(msg);
    }
    msg.textContent = message || '';
  } else {
    field.parentElement.classList.remove('form-field--error');
  }
};

window.setFieldSuccess = function(fieldId, show) {
  var field = document.getElementById(fieldId);
  if (!field) return;
  if (show) {
    field.parentElement.classList.add('form-field--success');
  } else {
    field.parentElement.classList.remove('form-field--success');
  }
};

const U = {
  prefixD: "\u0414",
  prefixVS: "\u0412\u0441",
  prefixPR: "\u041F\u0440",
  prefixOB: "\u041E\u0431\u0449",
  typeNameD: "\u0414\u0435\u0444\u0435\u043A\u0442",
  typeNameVS: "\u0412\u0441\u043A\u0440\u044B\u0442\u0438\u0435",
  typeNamePR: "\u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C",
  typeNameOB: "\u041E\u0431\u0449\u0438\u0439 \u0432\u0438\u0434",
  modeCorrection: "\u270F\uFE0F \u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F",
  modeMoveActive: "\uD83D\uDD13 \u0414\u0432\u0438\u0433\u0430\u0435\u043C",
  btnDark: "\uD83C\uDF19 \u0422\u0435\u043C\u043D.",
  btnLight: "\u2600\uFE0F \u0421\u0432\u0435\u0442.",
  offlineReady: "\uD83D\uDFE2 \u041E\u0444\u043B\u0430\u0439\u043D",
  sheetWord: "\u041B\u0438\u0441\u0442",
  noAxes: "\u0411\u0435\u0437\u041E\u0441\u0435\u0439",
  noPhotos: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B",
 inDocLabel: "\u0412 \u0434\u043E\u043A.",
  inAlbumLabel: "\u0412 \u0444\u043E\u0442\u043E\u043E\u0442\u0447.",
  figWord: "\u0420\u0438\u0441\u0443\u043D\u043E\u043A ",
  photoSchemeTitle: "\u0421\u0445\u0435\u043C\u0430 \u0444\u043E\u0442\u043E\u0444\u0438\u043A\u0441\u0430\u0446\u0438\u0438",
  toGalleryBtn: "\uD83D\uDCF2 \u0412 \u0424\u043E\u0442\u043E",
  svgHint: "\u0414\u0415\u041C\u041E-\u041F\u041B\u0410\u041D \u0411\u0422\u0418 (\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u00AB\u041F\u043B\u0430\u043D PDF/\u0424\u043E\u0442\u043E\u00BB \u0441\u0432\u0435\u0440\u0445\u0443 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0441\u0432\u043E\u0435\u0433\u043E \u0447\u0435\u0440\u0442\u0435\u0436\u0430)",
  promptVertAxis: "\u041E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u0441\u0438 (1, 2, 3...):",
  promptHorizAxis: "\u041E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u0441\u0438 (\u0410, \u0411, \u0412...):",
  hintLimAxisV1: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u0430\u044F \u043E\u0441\u044C \u0412: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 1-\u044E \u0442\u043E\u0447\u043A\u0443 (\u043D\u0430\u0447\u0430\u043B\u043E \u043E\u0441\u0438)",
  hintLimAxisV2: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u0430\u044F \u043E\u0441\u044C \u0412: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 2-\u044E \u0442\u043E\u0447\u043A\u0443 (\u043A\u043E\u043D\u0435\u0446 \u043E\u0441\u0438 \u043F\u043E \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u0438)",
  hintLimAxisH1: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u0430\u044F \u043E\u0441\u044C \u0413: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 1-\u044E \u0442\u043E\u0447\u043A\u0443 (\u043D\u0430\u0447\u0430\u043B\u043E \u043E\u0441\u0438)",
  hintLimAxisH2: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u0430\u044F \u043E\u0441\u044C \u0413: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 2-\u044E \u0442\u043E\u0447\u043A\u0443 (\u043A\u043E\u043D\u0435\u0446 \u043E\u0441\u0438 \u043F\u043E \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u0438)",
  confirmDelPt: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0447\u043A\u0443?",
  confirmClearAxes: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043E\u0441\u0438 \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u043C \u043B\u0438\u0441\u0442\u0435?",
  axesUpdatedMsg: "\u041E\u0441\u0438 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u0434\u043B\u044F \u0442\u043E\u0447\u0435\u043A: ",
  hintRect1: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 1-\u0439 \u0443\u0433\u043E\u043B \u043D\u0430 \u043F\u043B\u0430\u043D\u0435",
  hintRect2: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 2-\u0439 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u043E\u043B\u043E\u0436\u043D\u044B\u0439 \u0443\u0433\u043E\u043B",
  hintPoly: "\u041C\u043D\u043E\u0433\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430: \u043D\u0430\u0436\u0438\u043C\u0430\u0439\u0442\u0435 \u0443\u0433\u043B\u044B \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u00AB\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0443\u0440\u00BB",
  hintStamp: "\uD83D\uDCCC \u0420\u0435\u0436\u0438\u043C \u0442\u0438\u0440\u0430\u0436\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u0435\u0444\u0435\u043A\u0442\u0430: \u043D\u0430\u0436\u0438\u043C\u0430\u0439\u0442\u0435 \u043D\u0430 \u043F\u043B\u0430\u043D (\u0412\u044B\u0431\u043E\u0440 \u2014 \u0432\u044B\u0445\u043E\u0434)",
  hintEditMode: "\uD83D\uDD13 \u0420\u0435\u0436\u0438\u043C \u043A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u0438: \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u043C\u0435\u0442\u043A\u0438, \u0443\u0437\u043B\u044B \u0448\u0442\u0440\u0438\u0445\u043E\u0432\u043E\u043A \u0438 \u043A\u0440\u0443\u0436\u043A\u0438 \u043E\u0441\u0435\u0439",
  btnSameCode: "= \u0422\u043E\u0442 \u0436\u0435 \u2116",
  btnAddCode: "+ \u0414\u043E\u043F. \u043A\u043E\u0434",
  btnCopyNew: "\u0412 \u043D\u043E\u0432\u044B\u0439 \u2116",
  lblObj: "\u041E\u0431\u044A\u0435\u043A\u0442: ",
  lblAxes: "\u041E\u0441\u0438: ",
  lblZone: "\u0423\u0447\u0430\u0441\u0442\u043E\u043A: ",
  lblStruct: "\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F: ",
  lblCat: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: ",
  lblStrength: "\u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C: ",
  lblOpening: "\u0412\u0441\u043A\u0440\u044B\u0442\u0438\u0435: ",
  lblDesc: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: ",
  lblDate: "\u0414\u0430\u0442\u0430: ",
  mpaUnit: " \u041C\u041F\u0430",
  confirmFastZip: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u044B\u0441\u0442\u0440\u044B\u0439 ZIP \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0430 (\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u2194 \u041F\u041A) \u0431\u0435\u0437 \u0434\u0443\u0431\u043B\u0438\u043A\u0430\u0442\u043E\u0432 \u0441\u043E \u0448\u0442\u0430\u043C\u043F\u043E\u043C?\n\n\u041E\u041A \u2014 \u0411\u044B\u0441\u0442\u0440\u044B\u0439 ZIP (\u0431\u0430\u0437\u0430 + \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044B \u0444\u043E\u0442\u043E + Excel + \u0441\u0445\u0435\u043C\u0430)\n\u041E\u0442\u043C\u0435\u043D\u0430 \u2014 \u041F\u043E\u043B\u043D\u044B\u0439 ZIP (+\u043F\u0430\u043F\u043A\u0430 \u0444\u043E\u0442\u043E \u0441\u043E \u0448\u0442\u0430\u043C\u043F\u0430\u043C\u0438)",
  zipPackProgress: "\u23F3 \u0423\u043F\u0430\u043A\u043E\u0432\u043A\u0430 ZIP: ",
  zipUnpackProgress: "\u23F3 \u0420\u0430\u0441\u043F\u0430\u043A\u043E\u0432\u043A\u0430 ZIP: ",
  zipLoadedOk: "\u041F\u0440\u043E\u0435\u043A\u0442 \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B: ",
  confirmClearProject: "\u0412\u041D\u0418\u041C\u0410\u041D\u0418\u0415! \u0421\u0435\u0439\u0447\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430, \u043F\u043E\u0441\u043B\u0435 \u0447\u0435\u0433\u043E \u0432\u0441\u0435 \u0442\u043E\u0447\u043A\u0438, \u043E\u0441\u0438, \u0444\u043E\u0442\u043E \u0438 \u043F\u043B\u0430\u043D \u0431\u0443\u0434\u0443\u0442 \u043E\u0447\u0438\u0449\u0435\u043D\u044B.\n\n\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?",
  projectClearedMsg: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u0438 \u043E\u0447\u0438\u0449\u0435\u043D. \u0413\u043E\u0442\u043E\u0432\u043E \u043A \u043D\u043E\u0432\u043E\u043C\u0443 \u043E\u0431\u044A\u0435\u043A\u0442\u0443.",
  confirmDelSelectedPts: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0442\u043E\u0447\u043A\u0438?",
  selectPtsFirst: "\u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u0442\u043E\u0447\u043A\u0438 \u0433\u0430\u043B\u043E\u0447\u043A\u0430\u043C\u0438 \u0441\u043B\u0435\u0432\u0430.",
  confirmAppendPlan: "\u041F\u043B\u0430\u043D \u0443\u0436\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D.\n\n\u041E\u041A \u2014 \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u043A\u043E\u043D\u0435\u0446 (\u043A\u0430\u043A \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435)\n\u041E\u0442\u043C\u0435\u043D\u0430 \u2014 \u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0435\u0441\u044C \u043F\u043B\u0430\u043D \u043D\u043E\u0432\u044B\u043C \u0444\u0430\u0439\u043B\u043E\u043C",
  confirmDelPage: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043B\u0438\u0441\u0442 \u2116",
  confirmDelPageTail: " \u0438 \u0432\u0441\u0435 \u0442\u043E\u0447\u043A\u0438/\u043E\u0441\u0438 \u043D\u0430 \u043D\u0435\u043C?",
  pdfRenderProgress: "\u23F3 \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446 PDF: ",
  dbxConnected: "\uD83D\uDFE2 \u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043A Dropbox",
  dbxNotConnected: "\u26AA \u041D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  dbxEnterAppKey: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 App Key \u0438\u0437 Dropbox Developers Console",
  dbxAuthSuccess: "\u2705 \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F Dropbox \u0443\u0441\u043F\u0435\u0448\u043D\u0430!",
  dbxUploadStart: "\u2601\uFE0F\u2B06\uFE0F \u041E\u0431\u043B\u0430\u043A\u043E: \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432...",
  dbxUploadPhotoProgress: "\u2601\uFE0F\u2B06\uFE0F \u041E\u0431\u043B\u0430\u043A\u043E (\u043D\u043E\u0432\u044B\u0435 \u0444\u043E\u0442\u043E): ",
  dbxUploadDone: "\u2705 \u0412\u044B\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0432 Dropbox! \u041D\u043E\u0432\u044B\u0445 \u0444\u043E\u0442\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E: ",
  dbxDownloadStart: "\u2601\uFE0F\u2B07\uFE0F \u041E\u0431\u043B\u0430\u043A\u043E: \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0431\u0430\u0437\u044B...",
  dbxDownloadPhotoProgress: "\u2601\uFE0F\u2B07\uFE0F \u041E\u0431\u043B\u0430\u043A\u043E (\u0434\u043E\u043A\u0430\u0447\u043A\u0430 \u0444\u043E\u0442\u043E): ",
  dbxDownloadDone: "\u2705 \u041F\u0440\u043E\u0435\u043A\u0442 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D \u0438\u0437 Dropbox! \u0414\u043E\u043A\u0430\u0447\u0430\u043D\u043E \u043D\u043E\u0432\u044B\u0445 \u0444\u043E\u0442\u043E: ",
  dbxConfirmLoadFolder: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 Dropbox \u043F\u0440\u043E\u0435\u043A\u0442: ",
  dbxNoProjects: "\u041F\u0430\u043F\u043E\u043A \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
  dbxLoadBtn: "\u2B07\uFE0F \u041E\u0442\u043A\u0440\u044B\u0442\u044C",
  dbxBundleCopied: "\u2705 \u041A\u043E\u0434 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D! \u041F\u0435\u0440\u0435\u0448\u043B\u0438\u0442\u0435 \u0435\u0433\u043E \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0432 \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 Telegram) \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u00AB\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u0445\u043E\u0434\u00BB.",
  dbxBundlePromptCopy: "\u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u044D\u0442\u043E\u0442 \u043A\u043E\u0434 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F:",
  dbxBundlePromptPaste: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0441 \u041F\u041A \u043A\u043E\u0434 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F Dropbox:"
};

const TYPE_PREFIX = {
  D: U.prefixD,
  VS: U.prefixVS,
  PR: U.prefixPR,
  OB: U.prefixOB
};

const TYPE_FULL_NAME = {
  D: U.typeNameD,
  VS: U.typeNameVS,
  PR: U.typeNamePR,
  OB: U.typeNameOB
};

const DEFAULT_SETTINGS = {
  organization: "\u041E\u041E\u041E \u00AB\u041F\u041A\u0424 \u0421\u0442\u0440\u043E\u0439\u0440\u0435\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F\u00BB",
  instruments: [
    { id: "ips_mg403", name: "\u0418\u0437\u043C\u0435\u0440\u0438\u0442\u0435\u043B\u044C \u043F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u0438 \u0431\u0435\u0442\u043E\u043D\u0430 \u0418\u041F\u0421-\u041C\u04134 \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0418\u041F\u0421-\u041C\u04134.03", serial: "\u0437\u0430\u0432. \u2116 13283", gost: "\u0413\u041E\u0421\u0422 22690-2015, \u0413\u041E\u0421\u0422 18105-2018" },
    { id: "vik_expert", name: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0438 \u0438\u0437\u043C\u0435\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F (\u042D\u043A\u0441\u043F\u0435\u0440\u0442\u043D\u044B\u0439)", serial: "\u0431/\u043D", gost: "\u0413\u041E\u0421\u0422 31937-2024" },
    { id: "bosch_glm", name: "\u0414\u0430\u043B\u044C\u043D\u043E\u043C\u0435\u0440 \u043B\u0430\u0437\u0435\u0440\u043D\u044B\u0439 BOSCH GLM 250VF", serial: "\u0431/\u043D", gost: "\u0413\u041E\u0421\u0422 31937-2024" },
    { id: "poisk_26", name: "\u0418\u0437\u043C\u0435\u0440\u0438\u0442\u0435\u043B\u044C \u0437\u0430\u0449\u0438\u0442\u043D\u043E\u0433\u043E \u0441\u043B\u043E\u044F \u0431\u0435\u0442\u043E\u043D\u0430 \u041F\u043E\u0438\u0441\u043A-2.6", serial: "\u0431/\u043D", gost: "\u0413\u041E\u0421\u0422 22904-93" },
    { id: "b40a", name: "\u041E\u043F\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043D\u0438\u0432\u0435\u043B\u0438\u0440 B40A", serial: "\u0431/\u043D", gost: "\u0421\u041F 126.13330.2012" }
  ],
  defectCategories: [
    "1 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u043D\u043E\u0440\u043C\u0430\u0442\u0438\u0432\u043D\u043E\u0435)",
    "2 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u0440\u0430\u0431\u043E\u0442\u043E\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0435)",
    "3 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u043E\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0435)",
    "4 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u0430\u0432\u0430\u0440\u0438\u0439\u043D\u043E\u0435)",
    "5 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u0430\u0432\u0430\u0440\u0438\u0439\u043D\u043E\u0435)"
  ],
 structures: [],
  customAttributes: [
    { id: "crack_width", name: "\u0428\u0438\u0440\u0438\u043D\u0430 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u044F \u0442\u0440\u0435\u0449\u0438\u043D, \u043C\u043C", type: "number" },
    { id: "crack_step", name: "\u0428\u0430\u0433 \u0442\u0440\u0435\u0449\u0438\u043D, \u043C\u043C", type: "text" },
    { id: "deflection", name: "\u041F\u0440\u043E\u0433\u0438\u0431 (\u043C\u043C / \u0434\u043E\u043B\u044F \u043F\u0440\u043E\u043B\u0435\u0442\u0430)", type: "text" }
  ]
};

let state = {
  mode: 'view',
  editMode: false,
  darkPlan: false,
  swReady: false,
  selectedPtId: null,
  currentPage: 1,
  pageCount: 1,
  visibleTypes: { D: true, VS: true, PR: true, OB: true },
  project: {
    cipher: "260702-\u041E\u0411",
    shortName: "Pulkovskaya_9k2",
    fullName: "\u043F\u043B\u0438\u0442\u044B \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F \u0437\u0434\u0430\u043D\u0438\u044F \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443: \u0433. \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433, \u0443\u043B. \u041F\u0443\u043B\u043A\u043E\u0432\u0441\u043A\u0430\u044F, \u0434. 9, \u043A\u043E\u0440\u043F. 2",
    date: new Date().toISOString().slice(0, 10),
    protocolNum: "01/260702",
    director: "\u0413.\u0412. \u041A\u043E\u0440\u0441\u0430\u043A",
    gip: "\u0412.\u0412. \u0423\u0441\u043E\u0432"
  },
  settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
  axes: { vertical: [], horizontal: [] },
  points: [],
  bgDataUrl: null,
  planPages: []
};

let map, imageOverlay, markersLayerGroup, axesLayerGroup, tempDrawLayerGroup;
let editingAxisRef = null;
let editingAxisDir = null;
let lastAxisDragTime = 0;
let rectStartPt = null;
let axisDraftStartPt = null;
let polyDraftPts = [];
let stampTemplatePt = null;
const PLAN_W = 1000, PLAN_H = 700;

/* INDEXED-DB STORAGE FOR UNLIMITED FULL-RES PHOTOS (SEPARATE STORE photo_originals) */
const IDB_NAME = 'StroyrekSurveyIDB_v1';
const IDB_STORE = 'survey_project_store';
const IDB_PHOTO_STORE = 'photo_originals';
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPwaPrompt = e;
  var btn = document.getElementById('btnInstallPwa');
  if (btn) btn.style.display = 'inline-block';
});

window.addEventListener('appinstalled', function() {
  deferredPwaPrompt = null;
  var btn = document.getElementById('btnInstallPwa');
  if (btn) btn.style.display = 'none';
});

async function installPwaApp() {
  if (!deferredPwaPrompt) return;
  deferredPwaPrompt.prompt();
  await deferredPwaPrompt.userChoice;
  deferredPwaPrompt = null;
  var btn = document.getElementById('btnInstallPwa');
  if (btn) btn.style.display = 'none';
}

function openIDB() {
  return new Promise(function(resolve, reject) {
    if (!window.indexedDB) { reject(new Error('No IDB')); return; }
    var req = indexedDB.open(IDB_NAME, 2);
    req.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
      if (!db.objectStoreNames.contains(IDB_PHOTO_STORE)) {
        db.createObjectStore(IDB_PHOTO_STORE);
      }
    };
    req.onsuccess = function() { resolve(req.result); };
    req.onerror = function() { reject(req.error); };
  });
}

function blobToDataUrl(blob) {
  return new Promise(function(resolve, reject) {
    var r = new FileReader();
    r.onload = function(ev) { resolve(ev.target.result); };
    r.onerror = function() { reject(r.error); };
    r.readAsDataURL(blob);
  });
}

function savePhotoOriginalToIDB(phId, dataUrlOrBlob) {
  return openIDB().then(function(db) {
    return new Promise(function(resolve) {
      var blobObj = (typeof dataUrlOrBlob === 'string') ? dataUrlToBlob(dataUrlOrBlob) : dataUrlOrBlob;
      var tx = db.transaction(IDB_PHOTO_STORE, 'readwrite');
      tx.objectStore(IDB_PHOTO_STORE).put(blobObj, phId);
      tx.oncomplete = function() { resolve(true); };
      tx.onerror = function() { resolve(false); };
    });
  }).catch(function() { return false; });
}

function getPhotoOriginalDataUrl(ph) {
  if (!ph) return Promise.resolve('');
  if (ph.dataUrl && ph.dataUrl.length > 50000) return Promise.resolve(ph.dataUrl);
  return openIDB().then(function(db) {
    return new Promise(function(resolve) {
      var tx = db.transaction(IDB_PHOTO_STORE, 'readonly');
      var req = tx.objectStore(IDB_PHOTO_STORE).get(ph.id);
      req.onsuccess = function() {
        var val = req.result;
        if (!val) {
          resolve(ph.dataUrl || ph.thumbUrl || '');
        } else if (typeof val === 'string') {
          resolve(val);
        } else {
          blobToDataUrl(val).then(resolve).catch(function() {
            resolve(ph.dataUrl || ph.thumbUrl || '');
          });
        }
      };
      req.onerror = function() { resolve(ph.dataUrl || ph.thumbUrl || ''); };
    });
  }).catch(function() {
    return ph.dataUrl || ph.thumbUrl || '';
  });
}

function hasPhotoOriginalInIDB(phId) {
  return openIDB().then(function(db) {
    return new Promise(function(resolve) {
      var tx = db.transaction(IDB_PHOTO_STORE, 'readonly');
      var req = tx.objectStore(IDB_PHOTO_STORE).getKey(phId);
      req.onsuccess = function() { resolve(!!req.result); };
      req.onerror = function() { resolve(false); };
    });
  }).catch(function() { return false; });
}

function getPhotoOriginalBlobFromIDB(ph) {
  if (!ph) return Promise.resolve(null);
  return openIDB().then(function(db) {
    return new Promise(function(resolve) {
      var tx = db.transaction(IDB_PHOTO_STORE, 'readonly');
      var req = tx.objectStore(IDB_PHOTO_STORE).get(ph.id);
      req.onsuccess = function() {
        var val = req.result;
        if (!val) {
          var fallback = ph.dataUrl || ph.thumbUrl || '';
          resolve(fallback ? dataUrlToBlob(fallback) : null);
        } else if (typeof val === 'string') {
          resolve(dataUrlToBlob(val));
        } else {
          resolve(val);
        }
      };
      req.onerror = function() { resolve(null); };
    });
  }).catch(function() { return null; });
}

function deletePhotoOriginalFromIDB(phId) {
  openIDB().then(function(db) {
    var tx = db.transaction(IDB_PHOTO_STORE, 'readwrite');
    tx.objectStore(IDB_PHOTO_STORE).delete(phId);
  }).catch(function() {});
}

function clearAllPhotosInIDB() {
  return openIDB().then(function(db) {
    return new Promise(function(resolve) {
      var tx = db.transaction(IDB_PHOTO_STORE, 'readwrite');
      tx.objectStore(IDB_PHOTO_STORE).clear();
      tx.oncomplete = function() { resolve(true); };
      tx.onerror = function() { resolve(false); };
    });
  }).catch(function() { return false; });
}

function buildPhotoThumbDataUrl(dataUrl, maxSide, quality, rotDeg) {
  return new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() {
      var rawW = img.naturalWidth || img.width || 800;
      var rawH = img.naturalHeight || img.height || 600;
      var rot = ((rotDeg || 0) % 360 + 360) % 360;
      var swap = (rot === 90 || rot === 270);
      var w = swap ? rawH : rawW;
      var h = swap ? rawW : rawH;
      var ms = maxSide || 320;
      var scale = 1;
      if (w > ms || h > ms) {
        scale = (w > h) ? (ms / w) : (ms / h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }
      var c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      var ctx = c.getContext('2d');
      ctx.save();
      if (rot === 90) {
        ctx.translate(w, 0);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, 0, 0, h, w);
      } else if (rot === 180) {
        ctx.translate(w, h);
        ctx.rotate(Math.PI);
        ctx.drawImage(img, 0, 0, w, h);
      } else if (rot === 270) {
        ctx.translate(0, h);
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(img, 0, 0, h, w);
      } else {
        ctx.drawImage(img, 0, 0, w, h);
      }
      ctx.restore();
      resolve(c.toDataURL('image/jpeg', quality || 0.72));
    };
    img.onerror = function() { resolve(dataUrl); };
    img.src = dataUrl;
  });
}

function getRotatedPhotoDataUrl(ph) {
  return getPhotoOriginalDataUrl(ph).then(function(srcDataUrl) {
    var rot = ph ? (((ph.rotation || 0) % 360 + 360) % 360) : 0;
    if (!rot || !srcDataUrl) return srcDataUrl;
    return new Promise(function(resolve) {
      var img = new Image();
      img.onload = function() {
        var rawW = img.naturalWidth || img.width || 1600;
        var rawH = img.naturalHeight || img.height || 1200;
        var swap = (rot === 90 || rot === 270);
        var w = swap ? rawH : rawW;
        var h = swap ? rawW : rawH;
        var c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        var ctx = c.getContext('2d');
        ctx.save();
        if (rot === 90) {
          ctx.translate(w, 0);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(img, 0, 0, rawW, rawH);
        } else if (rot === 180) {
          ctx.translate(w, h);
          ctx.rotate(Math.PI);
          ctx.drawImage(img, 0, 0, rawW, rawH);
        } else if (rot === 270) {
          ctx.translate(0, h);
          ctx.rotate(-Math.PI / 2);
          ctx.drawImage(img, 0, 0, rawW, rawH);
        }
        ctx.restore();
        resolve(c.toDataURL('image/jpeg', 0.96));
      };
      img.onerror = function() { resolve(srcDataUrl); };
      img.src = srcDataUrl;
    });
  });
}

/* EXIF BINARY PARSER & JPEG APP1 INJECTOR */
function parseExifDateStrToIso(exifStr) {
  var m = String(exifStr || '').trim().match(/^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return null;
  return m[1] + '-' + m[2] + '-' + m[3] + 'T' + m[4] + ':' + m[5] + ':' + m[6];
}

function formatIsoToExifDateBytes(isoStr) {
  var d = isoStr ? new Date(isoStr) : new Date();
  if (isNaN(d.getTime())) d = new Date();
  var pad2 = function(n) { return ('0' + n).slice(-2); };
  var s = d.getFullYear() + ':' + pad2(d.getMonth() + 1) + ':' + pad2(d.getDate()) + ' ' +
          pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds()) + '\0';
  var out = new Uint8Array(20);
  for (var i = 0; i < 20; i++) out[i] = s.charCodeAt(i) || 0;
  return out;
}

async function extractExifFromBlob(blob) {
  try {
    if (!blob || !blob.arrayBuffer) return { app1Bytes: null, dateIso: null };
    var buf = await blob.arrayBuffer();
    var view = new DataView(buf);
    if (view.byteLength < 4 || view.getUint16(0, false) !== 0xFFD8) {
      return { app1Bytes: null, dateIso: null };
    }
    var offset = 2;
    while (offset + 4 <= view.byteLength) {
      var marker = view.getUint16(offset, false);
      if (marker === 0xFFDA || marker === 0xFFD9) break;
      var len = view.getUint16(offset + 2, false);
      if (len < 2 || offset + 2 + len > view.byteLength) break;

      if (marker === 0xFFE1 && len >= 14) {
        var hdr = String.fromCharCode(
          view.getUint8(offset + 4), view.getUint8(offset + 5),
          view.getUint8(offset + 6), view.getUint8(offset + 7)
        );
        if (hdr === 'Exif' && view.getUint8(offset + 8) === 0 && view.getUint8(offset + 9) === 0) {
          var app1Copy = new Uint8Array(buf.slice(offset, offset + 2 + len));
          var app1View = new DataView(app1Copy.buffer);
          var tiffStart = 10;
          var endian = app1View.getUint16(tiffStart, false);
          var le = (endian === 0x4949);
          var ifd0Off = app1View.getUint32(tiffStart + 4, le);
          var dateIso = null;
          var exifIfdOff = 0;

          var readAsciiTag = function(valOff, count) {
            var s = '';
            var end = Math.min(app1Copy.length, tiffStart + valOff + count);
            for (var k = tiffStart + valOff; k < end; k++) {
              var ch = app1Copy[k];
              if (ch === 0) break;
              s += String.fromCharCode(ch);
            }
            return s;
          };

          if (tiffStart + ifd0Off + 2 <= app1Copy.length) {
            var entries0 = app1View.getUint16(tiffStart + ifd0Off, le);
            for (var i = 0; i < entries0; i++) {
              var eOff = tiffStart + ifd0Off + 2 + i * 12;
              if (eOff + 12 > app1Copy.length) break;
              var tag = app1View.getUint16(eOff, le);
              var type = app1View.getUint16(eOff + 2, le);
              var cnt = app1View.getUint32(eOff + 4, le);
              var valOff = app1View.getUint32(eOff + 8, le);
              if (tag === 0x0112 && type === 3) {
                /* Normalize Orientation to 1 (Normal) so stamped canvas is not double-rotated */
                app1View.setUint16(eOff + 8, 1, le);
              } else if (tag === 0x0132 && type === 2 && cnt >= 19) {
                dateIso = parseExifDateStrToIso(readAsciiTag(valOff, cnt)) || dateIso;
              } else if (tag === 0x8769) {
                exifIfdOff = valOff;
              }
            }
          }

          if (exifIfdOff && tiffStart + exifIfdOff + 2 <= app1Copy.length) {
            var entriesEx = app1View.getUint16(tiffStart + exifIfdOff, le);
            for (var j = 0; j < entriesEx; j++) {
              var exOff = tiffStart + exifIfdOff + 2 + j * 12;
              if (exOff + 12 > app1Copy.length) break;
              var exTag = app1View.getUint16(exOff, le);
              var exType = app1View.getUint16(exOff + 2, le);
              var exCnt = app1View.getUint32(exOff + 4, le);
              var exValOff = app1View.getUint32(exOff + 8, le);
              if ((exTag === 0x9003 || exTag === 0x9004) && exType === 2 && exCnt >= 19) {
                var parsed = parseExifDateStrToIso(readAsciiTag(exValOff, exCnt));
                if (parsed) {
                  dateIso = parsed;
                  if (exTag === 0x9003) break;
                }
              }
            }
          }

          return { app1Bytes: app1Copy, dateIso: dateIso };
        }
      }
      offset += 2 + len;
    }
  } catch (e) {}
  return { app1Bytes: null, dateIso: null };
}

function buildMinimalExifApp1Segment(isoStr) {
  var dtBytes = formatIsoToExifDateBytes(isoStr);
  /* Minimal valid TIFF + IFD0 (Orientation, DateTime, ExifIFDPointer) + ExifIFD (DateTimeOriginal) */
  var tiffLen = 8 + 2 + (3 * 12) + 4 + 20 + 2 + (1 * 12) + 4 + 20;
  var segLen = 2 + 6 + tiffLen;
  var arr = new Uint8Array(2 + segLen);
  var dv = new DataView(arr.buffer);

  dv.setUint16(0, 0xFFE1, false);
  dv.setUint16(2, segLen, false);
  arr[4] = 0x45; arr[5] = 0x78; arr[6] = 0x69; arr[7] = 0x66; arr[8] = 0; arr[9] = 0;

  var t0 = 10;
  dv.setUint16(t0, 0x4949, false);
  dv.setUint16(t0 + 2, 42, true);
  dv.setUint32(t0 + 4, 8, true);

  /* IFD0 at offset 8 (3 entries) */
  var ifd0 = t0 + 8;
  dv.setUint16(ifd0, 3, true);

  /* Entry 0: Orientation (0x0112) = 1 */
  dv.setUint16(ifd0 + 2, 0x0112, true);
  dv.setUint16(ifd0 + 4, 3, true);
  dv.setUint32(ifd0 + 6, 1, true);
  dv.setUint16(ifd0 + 10, 1, true);
  dv.setUint16(ifd0 + 12, 0, true);

  /* Entry 1: DateTime (0x0132) -> offset 50 */
  dv.setUint16(ifd0 + 14, 0x0132, true);
  dv.setUint16(ifd0 + 16, 2, true);
  dv.setUint32(ifd0 + 18, 20, true);
  dv.setUint32(ifd0 + 22, 50, true);

  /* Entry 2: ExifIFDPointer (0x8769) -> offset 70 */
  dv.setUint16(ifd0 + 26, 0x8769, true);
  dv.setUint16(ifd0 + 28, 4, true);
  dv.setUint32(ifd0 + 30, 1, true);
  dv.setUint32(ifd0 + 34, 70, true);

  dv.setUint32(ifd0 + 38, 0, true);
  arr.set(dtBytes, t0 + 50);

  /* ExifIFD at offset 70 (1 entry: DateTimeOriginal 0x9003 -> offset 88) */
  var exifIfd = t0 + 70;
  dv.setUint16(exifIfd, 1, true);
  dv.setUint16(exifIfd + 2, 0x9003, true);
  dv.setUint16(exifIfd + 4, 2, true);
  dv.setUint32(exifIfd + 6, 20, true);
  dv.setUint32(exifIfd + 10, 88, true);
  dv.setUint32(exifIfd + 14, 0, true);
  arr.set(dtBytes, t0 + 88);

  return arr;
}

async function injectExifIntoJpegDataUrl(jpegDataUrl, ph) {
  try {
    if (!jpegDataUrl || jpegDataUrl.indexOf('data:image/jpeg') !== 0) return jpegDataUrl;
    var origBlob = await getPhotoOriginalBlobFromIDB(ph);
    var exifInfo = await extractExifFromBlob(origBlob);
    var app1Bytes = exifInfo.app1Bytes || buildMinimalExifApp1Segment(ph && ph.timestamp);

    var targetBlob = dataUrlToBlob(jpegDataUrl);
    var targetBuf = await targetBlob.arrayBuffer();
    var targetArr = new Uint8Array(targetBuf);
    if (targetArr.length < 4 || targetArr[0] !== 0xFF || targetArr[1] !== 0xD8) return jpegDataUrl;

    var outArr = new Uint8Array(targetArr.length + app1Bytes.length);
    outArr[0] = 0xFF;
    outArr[1] = 0xD8;
    outArr.set(app1Bytes, 2);
    outArr.set(targetArr.subarray(2), 2 + app1Bytes.length);

    return await blobToDataUrl(new Blob([outArr], { type: 'image/jpeg' }));
  } catch (e) {
    return jpegDataUrl;
  }
}

async function migrateLegacyPhotosToSeparateStore() {
  var migrated = false;
  for (var i = 0; i < state.points.length; i++) {
    var pt = state.points[i];
    var photos = pt.photos || [];
    for (var j = 0; j < photos.length; j++) {
      var ph = photos[j];
      if (ph.dataUrl) {
        await savePhotoOriginalToIDB(ph.id, ph.dataUrl);
        if (!ph.thumbUrl) {
          ph.thumbUrl = await buildPhotoThumbDataUrl(ph.dataUrl, 320, 0.72);
        }
        delete ph.dataUrl;
        migrated = true;
      }
    }
  }
  if (migrated) saveState();
}

function ensurePlanPagesConsistency() {
  if (!Array.isArray(state.planPages)) state.planPages = [];
  if (state.planPages.length === 0 && state.bgDataUrl) {
    state.planPages = [state.bgDataUrl];
  }
  state.pageCount = Math.max(1, state.planPages.length);
  if (!state.currentPage || state.currentPage < 1) state.currentPage = 1;
  if (state.currentPage > state.pageCount) state.currentPage = state.pageCount;
  state.bgDataUrl = state.planPages[state.currentPage - 1] || state.bgDataUrl || null;
}

function getPageBackgroundDataUrl(pageNum) {
  var p = pageNum || state.currentPage || 1;
  if (Array.isArray(state.planPages) && state.planPages[p - 1]) {
    return state.planPages[p - 1];
  }
  return state.bgDataUrl || createDefaultSvgPlan();
}

function saveState() {
  openIDB().then(function(db) {
    var tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(state, 'active_state');
  }).catch(function() {});

  try {
    var lightPoints = state.points.map(function(pt) {
      return Object.assign({}, pt, { photos: [] });
    });
    var copy = Object.assign({}, state, { bgDataUrl: null, planPages: [], points: lightPoints });
    localStorage.setItem('stroyrek_isaak_state_v2', JSON.stringify(copy));
  } catch (e) {}
}

function loadStateAsync() {
  return new Promise(function(resolve) {
    openIDB().then(function(db) {
      var tx = db.transaction(IDB_STORE, 'readonly');
      var req = tx.objectStore(IDB_STORE).get('active_state');
      req.onsuccess = function() {
        if (req.result) {
          state = Object.assign(state, req.result);
          state.mode = 'view';
          state.editMode = false;
          resolve();
        } else {
          loadFallbackLocalStorage();
          saveState();
          resolve();
        }
      };
      req.onerror = function() {
        loadFallbackLocalStorage();
        resolve();
      };
    }).catch(function() {
      loadFallbackLocalStorage();
      resolve();
    });
  });
}

function loadFallbackLocalStorage() {
  try {
    var raw = localStorage.getItem('stroyrek_isaak_state_v2');
    if (raw) {
      var parsed = JSON.parse(raw);
      state = Object.assign(state, parsed);
      state.mode = 'view';
      state.editMode = false;
    }
    var bg = localStorage.getItem('stroyrek_isaak_bg_v2');
    if (bg) state.bgDataUrl = bg;
  } catch (e) {}
}

window.onload = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
      state.swReady = true;
      if (reg && reg.update) reg.update();
      updateStatusText();
    }).catch(function() {});
  }

  initMap();
  loadStateAsync().then(async function() {
    await migrateLegacyPhotosToSeparateStore();
    ensurePlanPagesConsistency();
    syncProjectUI();
    populateSelectors();
    applyDarkPlanUI();
    updatePageControls();
    setMapBackground(getPageBackgroundDataUrl(state.currentPage));
    renderAxesAndMarkers();
    updateStatusText();
    await checkDropboxOAuthRedirect();
    updateDropboxUI();
  });
};

function isPointTypeVisible(type) {
  if (!state.visibleTypes || typeof state.visibleTypes !== 'object') {
    state.visibleTypes = { D: true, VS: true, PR: true, OB: true };
  }
  return state.visibleTypes[type] !== false;
}

function toggleTypeVisibility(type, checked) {
  if (!state.visibleTypes || typeof state.visibleTypes !== 'object') {
    state.visibleTypes = { D: true, VS: true, PR: true, OB: true };
  }
  state.visibleTypes[type] = !!checked;
  saveState();
  renderAxesAndMarkers();
}

function updateStatusText(customMsg) {
  var badge = state.swReady ? ' | <span style="color:#22c55e;">' + U.offlineReady + '</span>' : '';
  var cntD = 0, cntVS = 0, cntPR = 0, cntOB = 0;
  (state.points || []).forEach(function(p) {
    if (p.type === 'D') cntD++;
    else if (p.type === 'VS') cntVS++;
    else if (p.type === 'PR') cntPR++;
    else if (p.type === 'OB') cntOB++;
  });
  var chkD = isPointTypeVisible('D') ? 'checked' : '';
  var chkVS = isPointTypeVisible('VS') ? 'checked' : '';
  var chkPR = isPointTypeVisible('PR') ? 'checked' : '';
  var chkOB = isPointTypeVisible('OB') ? 'checked' : '';
  var lblStyle = 'display:inline-flex;align-items:center;gap:2px;cursor:pointer;margin-left:5px;user-select:none;';
  var inpStyle = 'width:12px;height:12px;margin:0;cursor:pointer;';
  var statStr = '\u0412\u0441\u0435\u0433\u043E: <b>' + state.points.length + '</b>' +
    '<label style="' + lblStyle + 'color:#fda4af;"><input type="checkbox" style="' + inpStyle + '" ' + chkD + ' onchange="toggleTypeVisibility(\'D\', this.checked)">\u0414:<b>' + cntD + '</b></label>' +
    '<label style="' + lblStyle + 'color:#fde68a;"><input type="checkbox" style="' + inpStyle + '" ' + chkVS + ' onchange="toggleTypeVisibility(\'VS\', this.checked)">\u0412\u0441:<b>' + cntVS + '</b></label>' +
    '<label style="' + lblStyle + 'color:#7dd3fc;"><input type="checkbox" style="' + inpStyle + '" ' + chkPR + ' onchange="toggleTypeVisibility(\'PR\', this.checked)">\u041F\u0440:<b>' + cntPR + '</b></label>' +
    '<label style="' + lblStyle + 'color:#5eead4;"><input type="checkbox" style="' + inpStyle + '" ' + chkOB + ' onchange="toggleTypeVisibility(\'OB\', this.checked)">\u041E\u0431\u0449:<b>' + cntOB + '</b></label>';
  var base = customMsg ? (customMsg + ' | ' + statStr) : statStr;
  document.getElementById('statusText').innerHTML = base + badge;
}

function nextDefectNumber() {
  var maxN = 0;
  state.points.filter(function(p) { return p.type === 'D'; }).forEach(function(p) {
    var codes = String(p.code || '').split(/[,;]+/);
    codes.forEach(function(c) {
      var m = c.trim().match(/(\d+)$/);
      if (m) {
        var n = parseInt(m[1], 10);
        if (n > maxN) maxN = n;
      }
    });
  });
  return maxN + 1;
}

function initMap() {
  map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 4,
    zoomSnap: 0.25,
    attributionControl: false
  });
  var bounds = [[0, 0], [PLAN_H, PLAN_W]];
  map.fitBounds(bounds);

  axesLayerGroup = L.layerGroup().addTo(map);
  markersLayerGroup = L.layerGroup().addTo(map);
  tempDrawLayerGroup = L.layerGroup().addTo(map);

  map.on('click', function(e) {
    if (Date.now() - lastAxisDragTime < 250) return;
    var x = Math.round(e.latlng.lng * 10) / 10;
    var y = Math.round(e.latlng.lat * 10) / 10;

    if (['D', 'VS', 'PR', 'OB'].indexOf(state.mode) !== -1) {
      createPointOnMap(state.mode, x, y);
    } else if (state.mode === 'D-rect') {
      handleRectClick(x, y);
    } else if (state.mode === 'D-poly') {
      handlePolyClick(x, y);
    } else if (state.mode === 'stamp' && stampTemplatePt) {
      createStampedDefectAt(x, y);
    } else if (state.mode === 'axis-v') {
      var isLimV = document.getElementById('chkLimitedAxis') && document.getElementById('chkLimitedAxis').checked;
      var badgePosV = (document.getElementById('selLimitedAxisBadgePos') && document.getElementById('selLimitedAxisBadgePos').value) || 'start';
      if (!isLimV) {
        var def = String(state.axes.vertical.filter(function(a) { return a.page === state.currentPage; }).length + 1);
        var lbl = prompt(U.promptVertAxis, def);
        if (lbl) {
          state.axes.vertical.push({ id: Date.now(), label: lbl.trim(), x: x, page: state.currentPage, badgePos: 'start' });
          state.axes.vertical.sort(function(a, b) { return a.x - b.x; });
          saveState();
          renderAxesAndMarkers();
        }
      } else {
        if (!axisDraftStartPt) {
          axisDraftStartPt = { x: x, y: y };
          tempDrawLayerGroup.clearLayers();
          L.circleMarker([y, x], { radius: 5, color: '#ef4444', fillColor: '#fef08a', fillOpacity: 1 }).addTo(tempDrawLayerGroup);
          updateStatusText(U.hintLimAxisV2);
        } else {
          var axX = axisDraftStartPt.x;
          var y1 = Math.min(axisDraftStartPt.y, y);
          var y2 = Math.max(axisDraftStartPt.y, y);
          if (y2 - y1 < 15) { y1 = Math.max(0, axX - 40); y2 = Math.min(PLAN_H, y1 + 80); }
          axisDraftStartPt = null;
          tempDrawLayerGroup.clearLayers();
          var defLim = String(state.axes.vertical.filter(function(a) { return a.page === state.currentPage; }).length + 1);
          var lblLim = prompt(U.promptVertAxis, defLim);
          if (lblLim) {
            state.axes.vertical.push({
              id: Date.now(),
              label: lblLim.trim(),
              x: axX,
              y1: y1,
              y2: y2,
              badgePos: badgePosV,
              page: state.currentPage
            });
            state.axes.vertical.sort(function(a, b) { return a.x - b.x; });
            saveState();
            renderAxesAndMarkers();
          }
          updateStatusText(U.hintLimAxisV1);
        }
      }
    } else if (state.mode === 'axis-h') {
      var isLimH = document.getElementById('chkLimitedAxis') && document.getElementById('chkLimitedAxis').checked;
      var badgePosH = (document.getElementById('selLimitedAxisBadgePos') && document.getElementById('selLimitedAxisBadgePos').value) || 'start';
      var rus = ['\u0410', '\u0411', '\u0412', '\u0413', '\u0414', '\u0415', '\u0416', '\u0418', '\u041A'];
      var idx = state.axes.horizontal.filter(function(a) { return a.page === state.currentPage; }).length;
      if (!isLimH) {
        var lblH = prompt(U.promptHorizAxis, rus[idx] || '\u0410');
        if (lblH) {
          state.axes.horizontal.push({ id: Date.now(), label: lblH.trim(), y: y, page: state.currentPage, badgePos: 'start' });
          state.axes.horizontal.sort(function(a, b) { return a.y - b.y; });
          saveState();
          renderAxesAndMarkers();
        }
      } else {
        if (!axisDraftStartPt) {
          axisDraftStartPt = { x: x, y: y };
          tempDrawLayerGroup.clearLayers();
          L.circleMarker([y, x], { radius: 5, color: '#ef4444', fillColor: '#fef08a', fillOpacity: 1 }).addTo(tempDrawLayerGroup);
          updateStatusText(U.hintLimAxisH2);
        } else {
          var axY = axisDraftStartPt.y;
          var x1 = Math.min(axisDraftStartPt.x, x);
          var x2 = Math.max(axisDraftStartPt.x, x);
          if (x2 - x1 < 15) { x1 = Math.max(0, x1 - 40); x2 = Math.min(PLAN_W, x1 + 80); }
          axisDraftStartPt = null;
          tempDrawLayerGroup.clearLayers();
          var lblHLim = prompt(U.promptHorizAxis, rus[idx] || '\u0410');
          if (lblHLim) {
            state.axes.horizontal.push({
              id: Date.now(),
              label: lblHLim.trim(),
              y: axY,
              x1: x1,
              x2: x2,
              badgePos: badgePosH,
              page: state.currentPage
            });
            state.axes.horizontal.sort(function(a, b) { return a.y - b.y; });
            saveState();
            renderAxesAndMarkers();
          }
          updateStatusText(U.hintLimAxisH1);
        }
      }
    }
  });
}

function onToggleLimitedAxisMode() {
  var chk = document.getElementById('chkLimitedAxis');
  var sel = document.getElementById('selLimitedAxisBadgePos');
  if (sel) sel.style.display = (chk && chk.checked) ? 'inline-block' : 'none';
  axisDraftStartPt = null;
  if (tempDrawLayerGroup) tempDrawLayerGroup.clearLayers();
}

function onToggleShowAxesInReport(checked) {
  state.showAxesInReport = !!checked;
  saveState();
}

function handleRectClick(x, y) {
  if (!rectStartPt) {
    rectStartPt = { x: x, y: y };
    tempDrawLayerGroup.clearLayers();
    L.circleMarker([y, x], { radius: 5, color: '#ef4444', fillColor: '#ffffff', fillOpacity: 1 }).addTo(tempDrawLayerGroup);
    updateStatusText(U.hintRect2);
  } else {
    var x1 = Math.min(rectStartPt.x, x), x2 = Math.max(rectStartPt.x, x);
    var y1 = Math.min(rectStartPt.y, y), y2 = Math.max(rectStartPt.y, y);
    if (x2 - x1 < 4) x2 = x1 + 20;
    if (y2 - y1 < 4) y2 = y1 + 20;
    var coords = [[y1, x1], [y1, x2], [y2, x2], [y2, x1]];
    var cx = Math.round(((x1 + x2) / 2) * 10) / 10;
    var cy = Math.round(((y1 + y2) / 2) * 10) / 10;
    rectStartPt = null;
    tempDrawLayerGroup.clearLayers();
    createAreaDefectOnMap(cx, cy, coords);
  }
}

function handlePolyClick(x, y) {
  if (polyDraftPts.length >= 3) {
    var first = polyDraftPts[0];
    var dist = Math.hypot(first[1] - x, first[0] - y);
    if (dist < 18) {
      finishActivePolygon();
      return;
    }
  }
  polyDraftPts.push([y, x]);
  renderTempPolygonDraft();
}

function renderTempPolygonDraft() {
  tempDrawLayerGroup.clearLayers();
  if (!polyDraftPts.length) return;
  L.polyline(polyDraftPts, { color: '#ef4444', weight: 2, dashArray: '5, 5' }).addTo(tempDrawLayerGroup);
  polyDraftPts.forEach(function(pt, i) {
    L.circleMarker(pt, {
      radius: i === 0 ? 6 : 4,
      color: '#ef4444',
      fillColor: i === 0 ? '#22c55e' : '#ffffff',
      fillOpacity: 1
    }).addTo(tempDrawLayerGroup);
  });
}

function finishActivePolygon() {
  if (polyDraftPts.length < 3) return;
  var coords = polyDraftPts.slice();
  var sumX = 0, sumY = 0;
  coords.forEach(function(c) { sumY += c[0]; sumX += c[1]; });
  var cx = Math.round((sumX / coords.length) * 10) / 10;
  var cy = Math.round((sumY / coords.length) * 10) / 10;
  polyDraftPts = [];
  tempDrawLayerGroup.clearLayers();
  document.getElementById('btnFinishPoly').style.display = 'none';
  createAreaDefectOnMap(cx, cy, coords);
}

function createAreaDefectOnMap(cx, cy, coords) {
  var num = nextDefectNumber();
  var page = state.currentPage || 1;
  var newPt = {
    id: 'pt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
    type: 'D',
    code: TYPE_PREFIX.D + num,
    page: page,
    x: cx,
    y: cy,
    areaStyle: 'hatch45',
    areaColor: '#ef4444',
    areaCoords: coords,
    inPhotoAlbum: false,
    axes: computeAxesForAreaOrPoint(cx, cy, coords, page) || '',
    zone: U.sheetWord + ' ' + page,
    structure: '',
    description: '',
    category: state.settings.defectCategories[3] || '',
    viewDirection: '',
    openingResult: '',
    instrumentId: state.settings.instruments[0] ? state.settings.instruments[0].id : 'ips_mg403',
    readings: '',
    mpa: '',
    concreteClass: '',
    customValues: {},
    photos: [],
    updatedAt: Date.now(),
    deleted: false
  };
  state.points.push(newPt);
  saveState();
  renderAxesAndMarkers();
  updateStatusText();
  openPointModal(newPt.id);
}

function startStampFromActivePoint() {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  saveActivePoint(false);
  stampTemplatePt = JSON.parse(JSON.stringify(pt));
  closePointModal();
  switchMainTab('draw');
  setMode('stamp');
  updateStatusText(U.hintStamp + ' [' + stampTemplatePt.code + ']');
}

function createStampedDefectAt(x, y) {
  if (!stampTemplatePt) return;
  var page = state.currentPage || 1;
  var newCoords = null;
  if (Array.isArray(stampTemplatePt.areaCoords) && stampTemplatePt.areaCoords.length >= 3) {
    var dx = x - stampTemplatePt.x;
    var dy = y - stampTemplatePt.y;
    newCoords = stampTemplatePt.areaCoords.map(function(c) {
      return [Math.round((c[0] + dy) * 10) / 10, Math.round((c[1] + dx) * 10) / 10];
    });
  }
  var newPt = {
    id: 'pt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
    type: stampTemplatePt.type || 'D',
    code: stampTemplatePt.code,
    page: page,
    x: x,
    y: y,
    areaStyle: stampTemplatePt.areaStyle || 'point',
    areaColor: stampTemplatePt.areaColor || '#ef4444',
    areaCoords: newCoords,
    inPhotoAlbum: !!stampTemplatePt.inPhotoAlbum,
    axes: computeAxesForAreaOrPoint(x, y, newCoords, page) || '',
    zone: stampTemplatePt.zone || (U.sheetWord + ' ' + page),
    structure: stampTemplatePt.structure || '',
    description: stampTemplatePt.description || '',
    category: stampTemplatePt.category || '',
    viewDirection: stampTemplatePt.viewDirection !== undefined ? stampTemplatePt.viewDirection : '',
    openingResult: stampTemplatePt.openingResult || '',
    instrumentId: stampTemplatePt.instrumentId || 'ips_mg403',
    readings: '',
    mpa: '',
    concreteClass: '',
    customValues: JSON.parse(JSON.stringify(stampTemplatePt.customValues || {})),
    photos: [],
    updatedAt: Date.now(),
    deleted: false
  };
  state.points.push(newPt);
  saveState();
  renderAxesAndMarkers();
}

function getHatchSegmentsForPolygon(coords, angleDeg, step) {
  if (!Array.isArray(coords) || coords.length < 3) return [];
  var rad = angleDeg * Math.PI / 180;
  var cos = Math.cos(rad), sin = Math.sin(rad);
  var rot = coords.map(function(pt) {
    var y = pt[0], x = pt[1];
    return {
      u: x * cos + y * sin,
      v: -x * sin + y * cos
    };
  });
  var vMin = Infinity, vMax = -Infinity;
  rot.forEach(function(p) {
    if (p.v < vMin) vMin = p.v;
    if (p.v > vMax) vMax = p.v;
  });
  var segments = [];
  var sp = step || 10;
  for (var v0 = Math.ceil(vMin / sp) * sp; v0 <= vMax; v0 += sp) {
    var uHits = [];
    for (var i = 0; i < rot.length; i++) {
      var p1 = rot[i];
      var p2 = rot[(i + 1) % rot.length];
      if ((p1.v <= v0 && p2.v > v0) || (p2.v <= v0 && p1.v > v0)) {
        var t = (v0 - p1.v) / (p2.v - p1.v);
        uHits.push(p1.u + t * (p2.u - p1.u));
      }
    }
    uHits.sort(function(a, b) { return a - b; });
    for (var k = 0; k + 1 < uHits.length; k += 2) {
      var u1 = uHits[k], u2 = uHits[k + 1];
      var x1 = u1 * cos - v0 * sin;
      var y1 = u1 * sin + v0 * cos;
      var x2 = u2 * cos - v0 * sin;
      var y2 = u2 * sin + v0 * cos;
      segments.push([[y1, x1], [y2, x2]]);
    }
  }
  return segments;
}

function getCombinedHatchSegments(coords, style) {
  var out = [];
  if (style === 'hatch45' || style === 'cross') {
    out = out.concat(getHatchSegmentsForPolygon(coords, 45, 10));
  }
  if (style === 'cross') {
    out = out.concat(getHatchSegmentsForPolygon(coords, -45, 10));
  }
  return out;
}

function setMapBackground(dataUrl) {
  var bounds = [[0, 0], [PLAN_H, PLAN_W]];
  if (imageOverlay) map.removeLayer(imageOverlay);
  imageOverlay = L.imageOverlay(dataUrl, bounds).addTo(map);
}

function createDefaultSvgPlan() {
  var c = document.createElement('canvas');
  c.width = 1000;
  c.height = 700;
  var ctx = c.getContext('2d');
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1000, 700);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 70, 880, 540);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 6]);
  ctx.beginPath();
  ctx.moveTo(350, 70); ctx.lineTo(350, 610);
  ctx.moveTo(650, 70); ctx.lineTo(650, 610);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(60, 340); ctx.lineTo(940, 340);
  ctx.stroke();
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(U.svgHint, 500, 660);
  return c.toDataURL('image/png');
}

async function handlePlanUpload(e) {
  var file = e.target.files[0];
  if (!file) return;
  e.target.value = '';

  ensurePlanPagesConsistency();
  var hasExistingPlan = state.planPages.length > 0 && state.bgDataUrl !== null;
  var appendMode = false;
  if (hasExistingPlan) {
    appendMode = confirm(U.confirmAppendPlan);
  }

  try {
    var newPages = [];
    var isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      var arrayBuffer = await file.arrayBuffer();
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      var pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      var total = pdfDoc.numPages;
      for (var p = 1; p <= total; p++) {
        updateStatusText(U.pdfRenderProgress + p + ' / ' + total);
        var page = await pdfDoc.getPage(p);
        var viewport = page.getViewport({ scale: 2.0 });
        var canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
        newPages.push(canvas.toDataURL('image/jpeg', 0.88));
      }
    } else {
      var imgUrl = await blobToDataUrl(file);
      newPages.push(imgUrl);
    }

    if (!newPages.length) return;

    if (appendMode) {
      var firstNewPageIdx = state.planPages.length + 1;
      state.planPages = state.planPages.concat(newPages);
      state.pageCount = state.planPages.length;
      state.currentPage = firstNewPageIdx;
    } else {
      state.planPages = newPages;
      state.pageCount = state.planPages.length;
      state.currentPage = 1;
    }

    state.bgDataUrl = state.planPages[state.currentPage - 1];
    updatePageControls();
    setMapBackground(state.bgDataUrl);
    renderAxesAndMarkers();
    saveState();
    updateStatusText();
  } catch (err) {
    updateStatusText();
    alert('PDF Error: ' + err.message);
  }
}

function changePdfPage(delta) {
  ensurePlanPagesConsistency();
  var next = state.currentPage + delta;
  if (next < 1 || next > state.pageCount) return;
  state.currentPage = next;
  state.bgDataUrl = getPageBackgroundDataUrl(next);
  updatePageControls();
  setMapBackground(state.bgDataUrl);
  renderAxesAndMarkers();
  saveState();
  updateStatusText();
}

function deleteCurrentPlanPage() {
  ensurePlanPagesConsistency();
  var cur = state.currentPage || 1;
  if (!confirm(U.confirmDelPage + cur + U.confirmDelPageTail)) return;

  var nowTs = Date.now();
  state.points.forEach(function(pt) {
    if ((pt.page || 1) === cur) {
      pt.deleted = true;
      pt.updatedAt = nowTs;
    } else if ((pt.page || 1) > cur) {
      var oldZone = U.sheetWord + ' ' + pt.page;
      pt.page = pt.page - 1;
      if (pt.zone === oldZone) pt.zone = U.sheetWord + ' ' + pt.page;
      pt.updatedAt = nowTs;
      refreshPointPhotoNames(pt);
    }
  });

  state.axes.vertical.forEach(function(a) {
    if ((a.page || 1) === cur) { a.deleted = true; a.updatedAt = nowTs; }
    else if ((a.page || 1) > cur) { a.page -= 1; a.updatedAt = nowTs; }
  });
  state.axes.horizontal.forEach(function(a) {
    if ((a.page || 1) === cur) { a.deleted = true; a.updatedAt = nowTs; }
    else if ((a.page || 1) > cur) { a.page -= 1; a.updatedAt = nowTs; }
  });

  if (state.planPages.length > 1) {
    state.planPages.splice(cur - 1, 1);
    state.pageCount = state.planPages.length;
    if (state.currentPage > state.pageCount) state.currentPage = state.pageCount;
    state.bgDataUrl = state.planPages[state.currentPage - 1];
  } else {
    state.planPages = [];
    state.pageCount = 1;
    state.currentPage = 1;
    state.bgDataUrl = null;
  }

  updatePageControls();
  setMapBackground(getPageBackgroundDataUrl(state.currentPage));
  renderAxesAndMarkers();
  saveState();
  updateStatusText();
}

function updatePageControls() {
  var hasAnyPlan = (Array.isArray(state.planPages) && state.planPages.length > 0) || !!state.bgDataUrl;
  var prevBtn = document.getElementById('btnPrevPage');
  var nextBtn = document.getElementById('btnNextPage');
  var ind = document.getElementById('pageIndicator');
  if (prevBtn) {
    prevBtn.style.display = 'inline-block';
    prevBtn.disabled = (state.currentPage <= 1);
  }
  if (nextBtn) {
    nextBtn.style.display = 'inline-block';
    nextBtn.disabled = (state.currentPage >= state.pageCount);
  }
  if (ind) {
    ind.style.display = 'inline-block';
    ind.textContent = state.currentPage + '/' + state.pageCount;
  }
  var delBtn = document.getElementById('btnDelPage');
  if (delBtn) {
    delBtn.style.display = 'inline-block';
    delBtn.disabled = !hasAnyPlan;
  }
}

function isAxisLimitedV(ax) {
  return typeof ax.y1 === 'number' && typeof ax.y2 === 'number';
}

function isAxisLimitedH(ax) {
  return typeof ax.x1 === 'number' && typeof ax.x2 === 'number';
}

function getAxisVBounds(ax) {
  var y1 = isAxisLimitedV(ax) ? Math.min(ax.y1, ax.y2) : 0;
  var y2 = isAxisLimitedV(ax) ? Math.max(ax.y1, ax.y2) : PLAN_H;
  var badgeY = (ax.badgePos === 'end') ? (isAxisLimitedV(ax) ? y2 : PLAN_H - 20) : (isAxisLimitedV(ax) ? y1 : 20);
  var otherY = (ax.badgePos === 'end') ? y1 : y2;
  return { y1: y1, y2: y2, badgeY: badgeY, otherY: otherY };
}

function getAxisHBounds(ax) {
  var x1 = isAxisLimitedH(ax) ? Math.min(ax.x1, ax.x2) : 0;
  var x2 = isAxisLimitedH(ax) ? Math.max(ax.x1, ax.x2) : PLAN_W;
  var badgeX = (ax.badgePos === 'end') ? (isAxisLimitedH(ax) ? x2 : PLAN_W - 20) : (isAxisLimitedH(ax) ? x1 : 20);
  var otherX = (ax.badgePos === 'end') ? x1 : x2;
  return { x1: x1, x2: x2, badgeX: badgeX, otherX: otherX };
}

function openAxisModal(dir, axObj) {
  editingAxisDir = dir;
  editingAxisRef = axObj;
  var inp = document.getElementById('axisModalInput');
  inp.value = axObj.label || '';
  var posSel = document.getElementById('axisModalBadgePos');
  if (posSel) posSel.value = axObj.badgePos || 'start';
  var limChk = document.getElementById('axisModalLimitedChk');
  if (limChk) {
    limChk.checked = (dir === 'v') ? isAxisLimitedV(axObj) : isAxisLimitedH(axObj);
  }
  document.getElementById('axisModal').classList.add('active');
  inp.focus();
}

function closeAxisModal() {
  document.getElementById('axisModal').classList.remove('active');
  editingAxisRef = null;
  editingAxisDir = null;
}

function saveAxisModal() {
  if (!editingAxisRef) return;
  var val = document.getElementById('axisModalInput').value.trim();
  if (val) editingAxisRef.label = val;

  var posSel = document.getElementById('axisModalBadgePos');
  if (posSel) editingAxisRef.badgePos = posSel.value || 'start';

  var limChk = document.getElementById('axisModalLimitedChk');
  if (limChk) {
    if (editingAxisDir === 'v') {
      if (limChk.checked && !isAxisLimitedV(editingAxisRef)) {
        editingAxisRef.y1 = 80;
        editingAxisRef.y2 = PLAN_H - 80;
      } else if (!limChk.checked) {
        delete editingAxisRef.y1;
        delete editingAxisRef.y2;
      }
    } else if (editingAxisDir === 'h') {
      if (limChk.checked && !isAxisLimitedH(editingAxisRef)) {
        editingAxisRef.x1 = 80;
        editingAxisRef.x2 = PLAN_W - 80;
      } else if (!limChk.checked) {
        delete editingAxisRef.x1;
        delete editingAxisRef.x2;
      }
    }
  }

  editingAxisRef.updatedAt = Date.now();
  saveState();
  renderAxesAndMarkers();
  closeAxisModal();
}

function deleteAxisModal() {
  if (!editingAxisRef) return;
  editingAxisRef.deleted = true;
  editingAxisRef.updatedAt = Date.now();
  saveState();
  renderAxesAndMarkers();
  closeAxisModal();
}

function isPointInPhotoAlbum(pt) {
  if (!pt) return false;
  if (typeof pt.inPhotoAlbum === 'boolean') return pt.inPhotoAlbum;
  return pt.type === 'OB';
}

function isPhotoInAlbum(pt, ph) {
  if (!ph) return false;
  if (typeof ph.inAlbum === 'boolean') return ph.inAlbum;
  return (pt && pt.type === 'OB') ? (ph.inDoc !== false) : false;
}

function computePhotoAlbumMap() {
  var orderedTypes = ['OB', 'VS', 'PR', 'D'];
  var byPointId = {};
  var byPhotoId = {};
  var list = [];
  var fig = 1;

  orderedTypes.forEach(function(t) {
    state.points.filter(function(p) { return !p.deleted && p.type === t; }).forEach(function(pt) {
      if (!isPointInPhotoAlbum(pt)) return;
      var selected = (pt.photos || []).filter(function(ph) { return isPhotoInAlbum(pt, ph); });
      if (!selected.length) return;
      byPointId[pt.id] = [];
      selected.forEach(function(ph) {
        byPointId[pt.id].push(fig);
        byPhotoId[ph.id] = fig;
        list.push({ fig: fig, pt: pt, ph: ph });
        fig++;
      });
      if (pt.type === 'OB' && byPointId[pt.id].length) {
        var newObCode = byPointId[pt.id].join(', ');
        if (pt.code !== newObCode) {
          pt.code = newObCode;
          pt.updatedAt = Date.now();
          refreshPointPhotoNames(pt);
          if (state.selectedPtId === pt.id) {
            var codeEl = document.getElementById('ptCode');
            if (codeEl && document.activeElement !== codeEl) codeEl.value = pt.code;
            var titleEl = document.getElementById('ptModalTitle');
            if (titleEl) titleEl.textContent = pt.code + ' (' + (pt.axes || U.noAxes) + ')';
          }
        }
      }
    });
  });

  return { byPointId: byPointId, byPhotoId: byPhotoId, list: list };
}

/* RENDER AXES, AREAS, HATCHES & MARKERS (MOVABLE ONLY IN EDIT MODE) */
function renderAxesAndMarkers() {
  if (!axesLayerGroup || !markersLayerGroup) return;
  axesLayerGroup.clearLayers();
  markersLayerGroup.clearLayers();

  var curPage = state.currentPage || 1;
  var cursorStyle = state.editMode ? 'cursor:grab;' : 'cursor:default;';
  var albumMap = computePhotoAlbumMap();
  var chkRep = document.getElementById('chkShowAxesInReport');
  if (chkRep) chkRep.checked = (state.showAxesInReport !== false);

  state.axes.vertical.filter(function(a) { return !a.deleted && (a.page || 1) === curPage; }).forEach(function(ax) {
    var b = getAxisVBounds(ax);
    var isLim = isAxisLimitedV(ax);
    var poly = L.polyline([[b.y1, ax.x], [b.y2, ax.x]], { color: '#ef4444', weight: 1.5, dashArray: '6, 6', interactive: false }).addTo(axesLayerGroup);
    var icon = L.divIcon({ className: '', html: '<div class="axis-badge" style="' + cursorStyle + '">' + ax.label + '</div>', iconSize: [24, 24], iconAnchor: [12, 12] });
    var m = L.marker([b.badgeY, ax.x], {
      icon: icon,
      draggable: state.editMode,
      interactive: state.editMode
    }).addTo(axesLayerGroup);

    if (state.editMode) {
      m.on('drag', function(ev) {
        var pos = ev.target.getLatLng();
        var nx = Math.max(0, Math.min(PLAN_W, Math.round(pos.lng * 10) / 10));
        var ny = Math.max(0, Math.min(PLAN_H, Math.round(pos.lat * 10) / 10));
        if (isLim) {
          if (ax.badgePos === 'end') ax.y2 = ny;
          else ax.y1 = ny;
          var nb = getAxisVBounds(ax);
          ev.target.setLatLng([ny, nx]);
          poly.setLatLngs([[nb.y1, nx], [nb.y2, nx]]);
        } else {
          ev.target.setLatLng([b.badgeY, nx]);
          poly.setLatLngs([[0, nx], [PLAN_H, nx]]);
        }
      });

      m.on('dragend', function(ev) {
        lastAxisDragTime = Date.now();
        var pos = ev.target.getLatLng();
        ax.x = Math.max(0, Math.min(PLAN_W, Math.round(pos.lng * 10) / 10));
        if (isLim) {
          var ny = Math.max(0, Math.min(PLAN_H, Math.round(pos.lat * 10) / 10));
          if (ax.badgePos === 'end') ax.y2 = ny;
          else ax.y1 = ny;
          var yMin = Math.min(ax.y1, ax.y2), yMax = Math.max(ax.y1, ax.y2);
          ax.y1 = yMin; ax.y2 = yMax;
        }
        state.axes.vertical.sort(function(a, b) { return a.x - b.x; });
        saveState();
        renderAxesAndMarkers();
      });

      m.on('click', function(ev) {
        L.DomEvent.stopPropagation(ev);
        if (Date.now() - lastAxisDragTime < 300) return;
        openAxisModal('v', ax);
      });

      if (isLim) {
        var endIcon = L.divIcon({
          className: '',
          html: '<div class="vertex-handle" style="border-color:#ef4444;"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        var endM = L.marker([b.otherY, ax.x], { icon: endIcon, draggable: true }).addTo(axesLayerGroup);
        endM.on('drag', function(ev) {
          var pos = ev.target.getLatLng();
          var ny = Math.max(0, Math.min(PLAN_H, Math.round(pos.lat * 10) / 10));
          ev.target.setLatLng([ny, ax.x]);
          poly.setLatLngs([[Math.min(ny, b.badgeY), ax.x], [Math.max(ny, b.badgeY), ax.x]]);
        });
        endM.on('dragend', function(ev) {
          lastAxisDragTime = Date.now();
          var pos = ev.target.getLatLng();
          var ny = Math.max(0, Math.min(PLAN_H, Math.round(pos.lat * 10) / 10));
          ax.y1 = Math.min(ny, b.badgeY);
          ax.y2 = Math.max(ny, b.badgeY);
          saveState();
          renderAxesAndMarkers();
        });
      }
    }
  });

  state.axes.horizontal.filter(function(a) { return !a.deleted && (a.page || 1) === curPage; }).forEach(function(ax) {
    var b = getAxisHBounds(ax);
    var isLim = isAxisLimitedH(ax);
    var poly = L.polyline([[ax.y, b.x1], [ax.y, b.x2]], { color: '#ef4444', weight: 1.5, dashArray: '6, 6', interactive: false }).addTo(axesLayerGroup);
    var icon = L.divIcon({ className: '', html: '<div class="axis-badge" style="' + cursorStyle + '">' + ax.label + '</div>', iconSize: [24, 24], iconAnchor: [12, 12] });
    var m = L.marker([ax.y, b.badgeX], {
      icon: icon,
      draggable: state.editMode,
      interactive: state.editMode
    }).addTo(axesLayerGroup);

    if (state.editMode) {
      m.on('drag', function(ev) {
        var pos = ev.target.getLatLng();
        var ny = Math.max(0, Math.min(PLAN_H, Math.round(pos.lat * 10) / 10));
        var nx = Math.max(0, Math.min(PLAN_W, Math.round(pos.lng * 10) / 10));
        if (isLim) {
          if (ax.badgePos === 'end') ax.x2 = nx;
          else ax.x1 = nx;
          var nb = getAxisHBounds(ax);
          ev.target.setLatLng([ny, nx]);
          poly.setLatLngs([[ny, nb.x1], [ny, nb.x2]]);
        } else {
          ev.target.setLatLng([ny, b.badgeX]);
          poly.setLatLngs([[ny, 0], [ny, PLAN_W]]);
        }
      });

      m.on('dragend', function(ev) {
        lastAxisDragTime = Date.now();
        var pos = ev.target.getLatLng();
        ax.y = Math.max(0, Math.min(PLAN_H, Math.round(pos.lat * 10) / 10));
        if (isLim) {
          var nx = Math.max(0, Math.min(PLAN_W, Math.round(pos.lng * 10) / 10));
          if (ax.badgePos === 'end') ax.x2 = nx;
          else ax.x1 = nx;
          var xMin = Math.min(ax.x1, ax.x2), xMax = Math.max(ax.x1, ax.x2);
          ax.x1 = xMin; ax.x2 = xMax;
        }
        ax.updatedAt = Date.now();
        state.axes.horizontal.sort(function(a, b) { return a.y - b.y; });
        saveState();
        renderAxesAndMarkers();
      });

      m.on('click', function(ev) {
        L.DomEvent.stopPropagation(ev);
        if (Date.now() - lastAxisDragTime < 300) return;
        openAxisModal('h', ax);
      });

      if (isLim) {
        var endIconH = L.divIcon({
          className: '',
          html: '<div class="vertex-handle" style="border-color:#ef4444;"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        var endMH = L.marker([ax.y, b.otherX], { icon: endIconH, draggable: true }).addTo(axesLayerGroup);
        endMH.on('drag', function(ev) {
          var pos = ev.target.getLatLng();
          var nx = Math.max(0, Math.min(PLAN_W, Math.round(pos.lng * 10) / 10));
          ev.target.setLatLng([ax.y, nx]);
          poly.setLatLngs([[ax.y, Math.min(nx, b.badgeX)], [ax.y, Math.max(nx, b.badgeX)]]);
        });
        endMH.on('dragend', function(ev) {
          lastAxisDragTime = Date.now();
          var pos = ev.target.getLatLng();
          var nx = Math.max(0, Math.min(PLAN_W, Math.round(pos.lng * 10) / 10));
          ax.x1 = Math.min(nx, b.badgeX);
          ax.x2 = Math.max(nx, b.badgeX);
          ax.updatedAt = Date.now();
          saveState();
          renderAxesAndMarkers();
        });
      }
    }
  });

  state.points.filter(function(p) { return !p.deleted && (p.page || 1) === curPage && isPointTypeVisible(p.type); }).forEach(function(pt) {
    var hasArea = pt.type === 'D' && pt.areaStyle && pt.areaStyle !== 'point' && Array.isArray(pt.areaCoords) && pt.areaCoords.length >= 3;
    var aColor = pt.areaColor || '#ef4444';
    var polyLayer = null;
    var hatchLayer = null;

    if (hasArea) {
      var fillOp = pt.areaStyle === 'fill' ? 0.32 : 0.08;
      polyLayer = L.polygon(pt.areaCoords, {
        color: aColor,
        weight: 2,
        fillColor: aColor,
        fillOpacity: fillOp
      }).addTo(markersLayerGroup);

      if (pt.areaStyle === 'hatch45' || pt.areaStyle === 'cross') {
        var initialHatch = getCombinedHatchSegments(pt.areaCoords, pt.areaStyle);
        hatchLayer = L.polyline(initialHatch, { color: aColor, weight: 1.5, interactive: false }).addTo(markersLayerGroup);
      }
    }

    var extra = (pt.type === 'PR' && pt.mpa) ? (' (' + pt.mpa + ')') : '';
    var bgStyle = (pt.type === 'D' && pt.areaColor) ? (' style="background:' + pt.areaColor + ';"') : '';
    var figNums = albumMap.byPointId[pt.id] || [];
    var displayCode = (pt.type === 'OB' && figNums.length) ? figNums.join(', ') : pt.code;
    var figBadgeHtml = (pt.type !== 'OB' && figNums.length) ? ('<span class="pt-fig-badge">' + figNums.join(', ') + '</span>') : '';
    var arrowHtml = '';
    if (pt.viewDirection !== undefined && pt.viewDirection !== null && pt.viewDirection !== '') {
      var ang = parseFloat(pt.viewDirection);
      if (!isNaN(ang)) {
        arrowHtml = '<svg style="position:absolute; top:50%; left:50%; width:84px; height:84px; transform:translate(-50%, -50%) rotate(' + ang + 'deg); pointer-events:none; z-index:-1;" viewBox="0 0 84 84">' +
                    '<path d="M 42 29 L 42 5 M 34 14 L 42 5 L 50 14" stroke="#18181b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />' +
                    '<path d="M 42 29 L 42 5 M 34 14 L 42 5 L 50 14" stroke="#ef4444" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />' +
                    '</svg>';
      }
    }
    var icon = L.divIcon({
      className: '',
      html: '<div class="pt-marker pt-marker-' + pt.type + '"' + bgStyle + '>' + displayCode + extra + figBadgeHtml + arrowHtml + '</div>',
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    var marker = L.marker([pt.y, pt.x], {
      icon: icon,
      draggable: state.editMode
    }).addTo(markersLayerGroup);

    marker.on('click', function(ev) {
      if (['view', 'D', 'VS', 'PR', 'OB'].indexOf(state.mode) === -1) return;
      L.DomEvent.stopPropagation(ev);
      if (!state.editMode) openPointModal(pt.id);
    });

    marker.on('drag', function(ev) {
      if (!hasArea) return;
      var pos = ev.target.getLatLng();
      var dx = pos.lng - pt.x;
      var dy = pos.lat - pt.y;
      var movedCoords = pt.areaCoords.map(function(c) {
        return [c[0] + dy, c[1] + dx];
      });
      if (polyLayer) polyLayer.setLatLngs(movedCoords);
      if (hatchLayer) hatchLayer.setLatLngs(getCombinedHatchSegments(movedCoords, pt.areaStyle));
    });

    marker.on('dragend', function(ev) {
      lastAxisDragTime = Date.now();
      var pos = ev.target.getLatLng();
      var newX = Math.round(pos.lng * 10) / 10;
      var newY = Math.round(pos.lat * 10) / 10;
      if (hasArea) {
        var dx = newX - pt.x;
        var dy = newY - pt.y;
        pt.areaCoords = pt.areaCoords.map(function(c) {
          return [Math.round((c[0] + dy) * 10) / 10, Math.round((c[1] + dx) * 10) / 10];
        });
      }
      pt.x = newX;
      pt.y = newY;
      pt.updatedAt = Date.now();
      var autoAx = computeAxesForAreaOrPoint(pt.x, pt.y, pt.areaCoords, pt.page || 1);
      if (autoAx) { pt.axes = autoAx; refreshPointPhotoNames(pt); }
      saveState();
      if (hasArea) renderAxesAndMarkers();
    });

    /* Vertex handles for defect zones are ONLY shown and draggable in Correction Mode (state.editMode) */
    if (hasArea && state.editMode) {
      pt.areaCoords.forEach(function(vCoord, vIdx) {
        var vIcon = L.divIcon({
          className: '',
          html: '<div class="vertex-handle" style="border-color:' + aColor + ';"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        var vm = L.marker([vCoord[0], vCoord[1]], {
          icon: vIcon,
          draggable: true,
          zIndexOffset: 600
        }).addTo(markersLayerGroup);

        vm.on('click', function(ev) {
          L.DomEvent.stopPropagation(ev);
        });

        vm.on('drag', function(ev) {
          var pos = ev.target.getLatLng();
          pt.areaCoords[vIdx] = [Math.round(pos.lat * 10) / 10, Math.round(pos.lng * 10) / 10];
          if (polyLayer) polyLayer.setLatLngs(pt.areaCoords);
          if (hatchLayer) hatchLayer.setLatLngs(getCombinedHatchSegments(pt.areaCoords, pt.areaStyle));
          var sx = 0, sy = 0;
          pt.areaCoords.forEach(function(c) { sy += c[0]; sx += c[1]; });
          pt.x = Math.round((sx / pt.areaCoords.length) * 10) / 10;
          pt.y = Math.round((sy / pt.areaCoords.length) * 10) / 10;
          marker.setLatLng([pt.y, pt.x]);
        });

        vm.on('dragend', function(ev) {
          lastAxisDragTime = Date.now();
          var pos = ev.target.getLatLng();
          pt.areaCoords[vIdx] = [Math.round(pos.lat * 10) / 10, Math.round(pos.lng * 10) / 10];
          var sx = 0, sy = 0;
          pt.areaCoords.forEach(function(c) { sy += c[0]; sx += c[1]; });
          pt.x = Math.round((sx / pt.areaCoords.length) * 10) / 10;
          pt.y = Math.round((sy / pt.areaCoords.length) * 10) / 10;
          var autoAx = computeAxesForAreaOrPoint(pt.x, pt.y, pt.areaCoords, pt.page || 1);
          if (autoAx) { pt.axes = autoAx; refreshPointPhotoNames(pt); }
          saveState();
          renderAxesAndMarkers();
        });

        /* Midpoint handle to insert a new corner node when dragged in Correction Mode */
        var nextCoord = pt.areaCoords[(vIdx + 1) % pt.areaCoords.length];
        var midY = Math.round(((vCoord[0] + nextCoord[0]) / 2) * 10) / 10;
        var midX = Math.round(((vCoord[1] + nextCoord[1]) / 2) * 10) / 10;
        var midIcon = L.divIcon({
          className: '',
          html: '<div class="vertex-mid-handle" style="border-color:' + aColor + ';"></div>',
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        });
        var midM = L.marker([midY, midX], {
          icon: midIcon,
          draggable: true,
          zIndexOffset: 500
        }).addTo(markersLayerGroup);

        midM.on('click', function(ev) {
          L.DomEvent.stopPropagation(ev);
        });

        midM.on('dragend', function(ev) {
          lastAxisDragTime = Date.now();
          var pos = ev.target.getLatLng();
          var newCorner = [Math.round(pos.lat * 10) / 10, Math.round(pos.lng * 10) / 10];
          pt.areaCoords.splice(vIdx + 1, 0, newCorner);
          var sx = 0, sy = 0;
          pt.areaCoords.forEach(function(c) { sy += c[0]; sx += c[1]; });
          pt.x = Math.round((sx / pt.areaCoords.length) * 10) / 10;
          pt.y = Math.round((sy / pt.areaCoords.length) * 10) / 10;
          var autoAx = computeAxesForAreaOrPoint(pt.x, pt.y, pt.areaCoords, pt.page || 1);
          if (autoAx) { pt.axes = autoAx; refreshPointPhotoNames(pt); }
          saveState();
          renderAxesAndMarkers();
        });
      });
    }
  });
}

let lastDefectSubMode = 'D';

function switchMainTab(tabName) {
  var tabs = ['files', 'reports', 'draw'];
  tabs.forEach(function(t) {
    var btn = document.getElementById('tabBtn_' + t);
    var panel = document.getElementById('panelBlock_' + t);
    if (btn) {
      if (t === tabName) btn.classList.add('active-tab');
      else btn.classList.remove('active-tab');
    }
    if (panel) {
      panel.style.display = (t === tabName) ? (t === 'draw' ? 'block' : 'flex') : 'none';
    }
  });
  if (map && map.invalidateSize) {
    setTimeout(function() { map.invalidateSize(); }, 60);
  }
}

function selectDefectGroup() {
  setMode(lastDefectSubMode || 'D');
}

function setMode(m) {
  state.mode = m;
  if (m === 'D' || m === 'D-rect' || m === 'D-poly') {
    lastDefectSubMode = m;
  }
  rectStartPt = null;
  axisDraftStartPt = null;
  polyDraftPts = [];
  if (tempDrawLayerGroup) tempDrawLayerGroup.clearLayers();
  var polyBtn = document.getElementById('btnFinishPoly');
  if (polyBtn) polyBtn.style.display = (m === 'D-poly') ? 'inline-block' : 'none';

  document.querySelectorAll('.workbar .tool-btn').forEach(function(b) {
    if (b.id === 'modeBtn') return;
    b.className = 'tool-btn';
  });

  var isDefectMode = (m === 'D' || m === 'D-rect' || m === 'D-poly' || m === 'stamp');
  var isAxisMode = (m === 'axis-v' || m === 'axis-h');

  if (isDefectMode) {
    var dGrp = document.getElementById('tool-D-group');
    if (dGrp) dGrp.classList.add('active-D');
    ['D', 'D-rect', 'D-poly'].forEach(function(subId) {
      var sb = document.getElementById('tool-' + subId);
      if (sb) sb.style.background = (subId === m) ? 'var(--col-D)' : '#1e293b';
      if (sb) sb.style.color = (subId === m) ? '#fff' : '#cbd5e1';
      if (sb) sb.style.borderColor = (subId === m) ? '#fda4af' : '#334155';
    });
  } else {
    var btn = document.getElementById('tool-' + m);
    if (btn) {
      if (m === 'view') btn.classList.add('active-view');
      else if (['VS', 'PR', 'OB'].indexOf(m) !== -1) btn.classList.add('active-' + m);
      else if (isAxisMode) btn.classList.add('active-axis');
    }
  }

  var infoEl = document.getElementById('subBar_info');
  var subD = document.getElementById('subBar_D');
  var subAx = document.getElementById('subBar_axis');

  if (subD) subD.style.display = isDefectMode ? 'flex' : 'none';
  if (subAx) subAx.style.display = isAxisMode ? 'flex' : 'none';
  if (infoEl) infoEl.style.display = (!isDefectMode && !isAxisMode) ? 'flex' : 'none';

  var isLim = document.getElementById('chkLimitedAxis') && document.getElementById('chkLimitedAxis').checked;
  if (m === 'D-rect') updateStatusText(U.hintRect1);
  else if (m === 'D-poly') updateStatusText(U.hintPoly);
  else if (m === 'axis-v' && isLim) updateStatusText(U.hintLimAxisV1);
  else if (m === 'axis-h' && isLim) updateStatusText(U.hintLimAxisH1);
  else updateStatusText();
}

function toggleEditMode() {
  state.editMode = !state.editMode;
  var btn = document.getElementById('modeBtn');
  btn.textContent = state.editMode ? U.modeMoveActive : U.modeCorrection;
  btn.className = state.editMode ? 'tool-btn btn-sea-slate active-mode' : 'tool-btn btn-sea-slate';
  renderAxesAndMarkers();
  updateStatusText(state.editMode ? U.hintEditMode : null);
}

function applyDarkPlanUI() {
  var btn = document.getElementById('themeBtn');
  if (state.darkPlan) {
    document.body.classList.add('dark-plan');
    btn.textContent = U.btnLight;
  } else {
    document.body.classList.remove('dark-plan');
    btn.textContent = U.btnDark;
  }
}

function toggleDarkPlan() {
  state.darkPlan = !state.darkPlan;
  saveState();
  applyDarkPlanUI();
}

function nextPointNumberForType(type, excludePtId) {
  var maxN = 0;
  state.points.forEach(function(p) {
    if (p.type !== type || p.id === excludePtId) return;
    var codes = String(p.code || '').split(/[,;]+/);
    codes.forEach(function(c) {
      var m = c.trim().match(/(\d+)$/);
      if (m) {
        var n = parseInt(m[1], 10);
        if (n > maxN) maxN = n;
      }
    });
  });
  return maxN + 1;
}

function buildDefaultPointCode(type, excludePtId) {
  var num = (type === 'D') ? nextDefectNumber() : nextPointNumberForType(type, excludePtId);
  if (type === 'OB') return String(num);
  var prefix = TYPE_PREFIX[type] || type;
  return prefix + num;
}

function createPointOnMap(type, x, y) {
  var page = state.currentPage || 1;
  var newPt = {
    id: 'pt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
    type: type,
    code: buildDefaultPointCode(type),
    page: page,
    x: x,
    y: y,
    areaStyle: 'point',
    areaColor: '#ef4444',
    areaCoords: null,
    inPhotoAlbum: (type === 'OB'),
    axes: computeAxesForCoords(x, y, page) || '',
    zone: U.sheetWord + ' ' + page,
    structure: '',
    description: '',
    category: state.settings.defectCategories[3] || '',
    viewDirection: '',
    openingResult: '',
    instrumentId: state.settings.instruments[0] ? state.settings.instruments[0].id : 'ips_mg403',
    readings: '',
    mpa: '',
    concreteClass: '',
    customValues: {},
    photos: [],
    updatedAt: Date.now(),
    deleted: false
  };
  state.points.push(newPt);
  saveState();
  renderAxesAndMarkers();
  updateStatusText();
  openPointModal(newPt.id);
}

function openPointModal(ptId) {
  state.selectedPtId = ptId;
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;

  document.getElementById('ptModalTitle').textContent = pt.code + ' (' + (pt.axes || U.noAxes) + ')';
  document.getElementById('ptType').value = pt.type;
  document.getElementById('ptCode').value = pt.code;
  document.getElementById('ptAxes').value = pt.axes || '';
  document.getElementById('ptZone').value = pt.zone || '';
  document.getElementById('ptStructure').value = pt.structure || '';
  document.getElementById('ptDesc').value = pt.description || '';
  document.getElementById('ptInPhotoAlbum').checked = isPointInPhotoAlbum(pt);
  var hasDir = pt.viewDirection !== undefined && pt.viewDirection !== null && pt.viewDirection !== '';
  document.getElementById('ptHasDirection').checked = hasDir;
  document.getElementById('ptDirectionWrap').style.display = hasDir ? 'flex' : 'none';
  document.getElementById('ptDirectionAngle').value = hasDir ? pt.viewDirection : 0;
  onViewDirectionInput();
  document.getElementById('ptCategory').value = pt.category || '';
  document.getElementById('ptAreaStyle').value = pt.areaStyle || 'point';
  document.getElementById('ptAreaColor').value = pt.areaColor || '#ef4444';
  document.getElementById('ptOpeningRes').value = pt.openingResult || '';
  document.getElementById('ptInstrument').value = pt.instrumentId || '';
  document.getElementById('ptReadings').value = pt.readings || '';
  document.getElementById('ptMpa').value = pt.mpa || '';
  document.getElementById('ptConcreteClass').value = pt.concreteClass || '';

  document.getElementById('blockDefect').style.display = pt.type === 'D' ? 'flex' : 'none';
  document.getElementById('blockOpening').style.display = pt.type === 'VS' ? 'flex' : 'none';
  document.getElementById('blockStrength').style.display = pt.type === 'PR' ? 'flex' : 'none';
  document.getElementById('defectSuggestionsBox').classList.remove('active');

  renderCustomAttributesInputs(pt);
  renderPointPhotos(pt);
  document.getElementById('pointModal').classList.add('active');
}

function ensureStructureInList(val) {
  var v = String(val || '').trim();
  if (!v) return;
  if (!Array.isArray(state.settings.structures)) state.settings.structures = [];
  if (state.settings.structures.indexOf(v) === -1) {
    state.settings.structures.push(v);
    populateSelectors();
    saveState();
  }
}

function onPtStructureCommit() {
  var val = document.getElementById('ptStructure').value.trim();
  ensureStructureInList(val);
  saveActivePoint(true);
}

function closePointModal() {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (pt && pt.structure) ensureStructureInList(pt.structure);
  document.getElementById('pointModal').classList.remove('active');
  document.getElementById('defectSuggestionsBox').classList.remove('active');
  state.selectedPtId = null;
  renderAxesAndMarkers();
}

function onAreaStyleChange() {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  var st = document.getElementById('ptAreaStyle').value;
  pt.areaStyle = st;
  if (st !== 'point' && (!Array.isArray(pt.areaCoords) || pt.areaCoords.length < 3)) {
    var x1 = Math.max(0, pt.x - 40), x2 = Math.min(PLAN_W, pt.x + 40);
    var y1 = Math.max(0, pt.y - 28), y2 = Math.min(PLAN_H, pt.y + 28);
    pt.areaCoords = [[y1, x1], [y1, x2], [y2, x2], [y2, x1]];
  }
  saveActivePoint(false);
}

function onPtDescInput() {
  saveActivePoint(false);
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (pt && pt.type === 'D') {
    renderDefectSuggestions(document.getElementById('ptDesc').value);
  }
}

function onToggleViewDirection() {
  var chk = document.getElementById('ptHasDirection').checked;
  document.getElementById('ptDirectionWrap').style.display = chk ? 'flex' : 'none';
  if (chk) onViewDirectionInput();
  saveActivePoint(false);
}

function onViewDirectionInput() {
  var val = document.getElementById('ptDirectionAngle').value;
  var arr = document.getElementById('ptDirectionPreviewArrow');
  if (arr) arr.style.transform = 'rotate(' + val + 'deg)';
  var lbl = document.getElementById('ptDirectionDegLbl');
  if (lbl) lbl.textContent = val + '\u00B0';
}

function setQuickViewDirection(deg) {
  var chk = document.getElementById('ptHasDirection');
  if (chk && !chk.checked) {
    chk.checked = true;
    document.getElementById('ptDirectionWrap').style.display = 'flex';
  }
  var rng = document.getElementById('ptDirectionAngle');
  if (rng) rng.value = deg;
  onViewDirectionInput();
  saveActivePoint(false);
}

function toggleDefectSuggestions(forceShow) {
  var box = document.getElementById('defectSuggestionsBox');
  if (!forceShow && box.classList.contains('active')) {
    box.classList.remove('active');
    return;
  }
  renderDefectSuggestions(document.getElementById('ptDesc').value, true);
}

function getUniqueExistingDefects(excludePtId) {
  var mapByKey = {};
  state.points.forEach(function(p) {
    if (p.deleted || p.type !== 'D' || p.id === excludePtId) return;
    var desc = (p.description || '').trim();
    if (!desc && !p.code) return;
    var codes = String(p.code || '').split(/[,;]+/).map(function(s) { return s.trim(); }).filter(Boolean);
    var mainCode = codes[0] || p.code;
    var key = mainCode + '||' + desc;
    if (!mapByKey[key]) {
      mapByKey[key] = {
        code: mainCode,
        description: desc,
        structure: p.structure || '',
        category: p.category || '',
        areaStyle: p.areaStyle || 'point',
        areaColor: p.areaColor || '#ef4444'
      };
    }
  });
  return Object.keys(mapByKey).map(function(k) { return mapByKey[k]; });
}

function renderDefectSuggestions(queryText, showAllIfEmpty) {
  var box = document.getElementById('defectSuggestionsBox');
  var list = getUniqueExistingDefects(state.selectedPtId);
  var q = String(queryText || '').trim().toLowerCase();

  var filtered = list.filter(function(item) {
    if (!q) return !!showAllIfEmpty;
    return item.description.toLowerCase().indexOf(q) !== -1 || item.code.toLowerCase().indexOf(q) !== -1 || item.structure.toLowerCase().indexOf(q) !== -1;
  });

  if (!filtered.length) {
    if (showAllIfEmpty && list.length) {
      filtered = list;
    } else {
      box.classList.remove('active');
      return;
    }
  }

  box.innerHTML = filtered.map(function(item, idx) {
    var safeDesc = (item.description || '-').replace(/</g, '&lt;');
    var meta = [item.structure, item.category].filter(Boolean).join(' | ');
    return '<div class="suggest-item">' +
      '<div><b style="color:#fca5a5;">' + item.code + '</b>: ' + safeDesc + '</div>' +
      (meta ? '<div style="font-size:10px; color:#a1a1aa;">' + meta + '</div>' : '') +
      '<div class="suggest-actions">' +
        '<button type="button" class="suggest-btn primary" onclick="applyDefectSuggestion(' + idx + ', \'same\')">' + U.btnSameCode + ' (' + item.code + ')</button>' +
        '<button type="button" class="suggest-btn add" onclick="applyDefectSuggestion(' + idx + ', \'append\')">' + U.btnAddCode + ' (+' + item.code + ')</button>' +
        '<button type="button" class="suggest-btn" onclick="applyDefectSuggestion(' + idx + ', \'copy\')">' + U.btnCopyNew + '</button>' +
      '</div>' +
    '</div>';
  }).join('');

  box._cachedItems = filtered;
  box.classList.add('active');
}

function applyDefectSuggestion(idx, mode) {
  var box = document.getElementById('defectSuggestionsBox');
  var items = box._cachedItems || [];
  var item = items[idx];
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!item || !pt) return;

  if (mode === 'same') {
    document.getElementById('ptCode').value = item.code;
    if (item.description) document.getElementById('ptDesc').value = item.description;
    if (item.structure) document.getElementById('ptStructure').value = item.structure;
    if (item.category) document.getElementById('ptCategory').value = item.category;
  } else if (mode === 'append') {
    var curCodes = String(document.getElementById('ptCode').value || '')
      .split(/[,;]+/).map(function(s) { return s.trim(); }).filter(Boolean);
    if (curCodes.indexOf(item.code) === -1) curCodes.push(item.code);
    document.getElementById('ptCode').value = curCodes.join(', ');
    var curDesc = document.getElementById('ptDesc').value.trim();
    if (!curDesc && item.description) {
      document.getElementById('ptDesc').value = item.description;
    }
  } else if (mode === 'copy') {
    if (item.description) document.getElementById('ptDesc').value = item.description;
    if (item.structure) document.getElementById('ptStructure').value = item.structure;
    if (item.category) document.getElementById('ptCategory').value = item.category;
  }

  box.classList.remove('active');
  saveActivePoint(true);
}

function onPointTypeChange() {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  var newType = document.getElementById('ptType').value;
  pt.type = newType;
  document.getElementById('ptCode').value = buildDefaultPointCode(newType, pt.id);
  if (pt.type === 'OB') {
    pt.inPhotoAlbum = true;
    document.getElementById('ptInPhotoAlbum').checked = true;
  }
  saveActivePoint(true);
  openPointModal(pt.id);
}

function saveActivePoint(renamePhotos) {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  pt.type = document.getElementById('ptType').value;
  pt.code = document.getElementById('ptCode').value.trim();
  pt.axes = document.getElementById('ptAxes').value.trim();
  pt.zone = document.getElementById('ptZone').value.trim();
  pt.structure = document.getElementById('ptStructure').value.trim();
  pt.description = document.getElementById('ptDesc').value;
  pt.inPhotoAlbum = !!document.getElementById('ptInPhotoAlbum').checked;
  var hasDir = document.getElementById('ptHasDirection').checked;
  pt.viewDirection = hasDir ? document.getElementById('ptDirectionAngle').value : '';
  pt.category = document.getElementById('ptCategory').value;
  pt.areaStyle = document.getElementById('ptAreaStyle').value || 'point';
  pt.areaColor = document.getElementById('ptAreaColor').value || '#ef4444';
  pt.openingResult = document.getElementById('ptOpeningRes').value;
  pt.instrumentId = document.getElementById('ptInstrument').value;
  pt.readings = document.getElementById('ptReadings').value;
  pt.mpa = document.getElementById('ptMpa').value;
  pt.concreteClass = document.getElementById('ptConcreteClass').value;
  pt.updatedAt = Date.now();

  document.getElementById('ptModalTitle').textContent = pt.code + ' (' + (pt.axes || U.noAxes) + ')';
  if (renamePhotos && pt.photos.length) {
    refreshPointPhotoNames(pt);
  }
  renderPointPhotos(pt);
  saveState();
  renderAxesAndMarkers();
}

function deleteActivePoint() {
  if (!state.selectedPtId || !confirm(U.confirmDelPt)) return;
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (pt) {
    pt.deleted = true;
    pt.updatedAt = Date.now();
  }
  saveState();
  updateStatusText();
  closePointModal();
}

function onStrengthReadingsInput() {
  var nums = document.getElementById('ptReadings').value
    .split(/[,\s;]+/).map(function(s) { return parseFloat(s.replace(',', '.')); }).filter(function(n) { return !isNaN(n) && n > 0; });
  if (nums.length > 0) {
    var avg = nums.reduce(function(a, b) { return a + b; }, 0) / nums.length;
    var valid = nums.filter(function(v) { return Math.abs(v - avg) / avg <= 0.10; });
    var arr = valid.length ? valid : nums;
    var mean = Math.round((arr.reduce(function(a, b) { return a + b; }, 0) / arr.length) * 10) / 10;
    document.getElementById('ptMpa').value = mean;
    document.getElementById('ptConcreteClass').value = estimateConcreteClass(mean);
  }
  saveActivePoint(false);
}

function onMpaInput() {
  var val = parseFloat(document.getElementById('ptMpa').value);
  if (!isNaN(val) && val > 0) document.getElementById('ptConcreteClass').value = estimateConcreteClass(val);
  saveActivePoint(false);
}

function estimateConcreteClass(mpa) {
  var t = [
    { min: 64, cls: 'B55' }, { min: 55, cls: 'B50' }, { min: 51, cls: 'B45' },
    { min: 45, cls: 'B40' }, { min: 38.5, cls: 'B35' }, { min: 32, cls: 'B30' },
    { min: 28, cls: 'B27.5' }, { min: 25, cls: 'B25' }, { min: 21.5, cls: 'B22.5' },
    { min: 19, cls: 'B20' }, { min: 14, cls: 'B15' }, { min: 0, cls: 'B10' }
  ];
  var found = t.find(function(r) { return mpa >= r.min; });
  return found ? found.cls : 'B15';
}

function buildPhotoFileName(pt, index, isoTs) {
  var clean = function(s) { return (s || '').replace(/[^a-zA-Z\u0400-\u04FF0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, ''); };
  var obj = clean(state.project.shortName || state.project.cipher);
  var zone = clean(pt.zone || ('L' + (pt.page || 1)));
  var ax = pt.axes ? clean(pt.axes) : U.noAxes;
  var str = clean(pt.structure || '');
  var dt = (isoTs || new Date().toISOString()).replace(/[-:]/g, '').replace('T', '_').slice(0, 15);
  return [obj, zone, ax, clean(pt.code), str, dt, (index + 1)].filter(Boolean).join('_') + '.jpg';
}

function refreshPointPhotoNames(pt) {
  pt.photos.forEach(function(ph, i) { ph.fileName = buildPhotoFileName(pt, i, ph.timestamp); });
}

function wrapCanvasLines(ctx, text, maxWidth) {
  var words = String(text || '').split(/\s+/);
  var lines = [];
  var cur = '';
  for (var i = 0; i < words.length; i++) {
    var test = cur ? (cur + ' ' + words[i]) : words[i];
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = words[i];
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [''];
}

/* RENDER FULL-RESOLUTION STAMPED PHOTO WITH ALL ATTRIBUTES */
async function buildStampedPhotoDataUrl(pt, ph) {
  var srcDataUrl = await getRotatedPhotoDataUrl(ph);
  var rawStamped = await new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() {
      var w = img.naturalWidth || img.width || 1600;
      var h = img.naturalHeight || img.height || 1200;
      var fontSize = Math.max(18, Math.round(w * 0.022));
      var lineHeight = Math.round(fontSize * 1.38);
      var pad = Math.round(fontSize * 0.9);

      var tempC = document.createElement('canvas');
      var tCtx = tempC.getContext('2d');
      tCtx.font = 'bold ' + fontSize + 'px sans-serif';

      var rawLines = [];
      var tName = TYPE_FULL_NAME[pt.type] || pt.type;
      rawLines.push(U.lblObj + state.project.cipher + ' (' + (state.project.shortName || '') + ') | ' + tName + ': ' + (pt.code || '-'));

      var locParts = [];
      if (pt.axes) locParts.push(U.lblAxes + pt.axes);
      if (pt.zone) locParts.push(U.lblZone + pt.zone);
      if (pt.structure) locParts.push(U.lblStruct + pt.structure);
      if (locParts.length) rawLines.push(locParts.join(' | '));

      if (pt.type === 'D' && pt.category) {
        rawLines.push(U.lblCat + pt.category);
      } else if (pt.type === 'PR' && (pt.mpa || pt.concreteClass)) {
        rawLines.push(U.lblStrength + (pt.mpa ? pt.mpa + U.mpaUnit : '') + (pt.concreteClass ? ' (' + pt.concreteClass + ')' : ''));
      } else if (pt.type === 'VS' && pt.openingResult) {
        rawLines.push(U.lblOpening + pt.openingResult);
      }

      var customParts = [];
      (state.settings.customAttributes || []).forEach(function(attr) {
        var v = pt.customValues && pt.customValues[attr.id];
        if (v !== undefined && String(v).trim() !== '') {
          customParts.push(attr.name + ': ' + v);
        }
      });
      if (customParts.length) rawLines.push(customParts.join(' | '));

      if (pt.description) {
        rawLines.push(U.lblDesc + pt.description);
      }

      var dtStr = (ph.timestamp || new Date().toISOString()).replace('T', ' ').slice(0, 16);
      rawLines.push(U.lblDate + dtStr + ' | ' + (ph.fileName || ''));

      var wrappedLines = [];
      var maxTextW = w - pad * 2;
      rawLines.forEach(function(line, idx) {
        var wl = wrapCanvasLines(tCtx, line, maxTextW);
        wl.forEach(function(sub) {
          wrappedLines.push({ text: sub, highlight: idx === 0 });
        });
      });

      var footerH = pad * 2 + wrappedLines.length * lineHeight;
      var c = document.createElement('canvas');
      c.width = w;
      c.height = h + footerH;
      var ctx = c.getContext('2d');

      ctx.drawImage(img, 0, 0, w, h);

      ctx.fillStyle = '#141417';
      ctx.fillRect(0, h, w, footerH);
      ctx.strokeStyle = pt.areaColor || '#3b82f6';
      ctx.lineWidth = Math.max(4, Math.round(w * 0.004));
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(w, h);
      ctx.stroke();

      ctx.textBaseline = 'top';
      wrappedLines.forEach(function(item, i) {
        ctx.font = (item.highlight ? 'bold ' : '600 ') + fontSize + 'px sans-serif';
        ctx.fillStyle = item.highlight ? '#fef08a' : '#f4f4f5';
        ctx.fillText(item.text, pad, h + pad + i * lineHeight);
      });

      resolve(c.toDataURL('image/jpeg', 0.96));
    };
    img.onerror = function() { resolve(srcDataUrl); };
    img.src = srcDataUrl;
  });
  return await injectExifIntoJpegDataUrl(rawStamped, ph);
}

/* COMPRESS IMAGE ONLY FOR EMBEDDING INSIDE WORD .DOCX TABLES (RETURNS DIMENSIONS FOR ASPECT RATIO) */
function compressDataUrlForDocx(dataUrl, maxSide, quality) {
  return new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() {
      var w = img.naturalWidth || img.width || 1000;
      var h = img.naturalHeight || img.height || 750;
      var ms = maxSide || 1280;
      if (w > ms || h > ms) {
        if (w > h) { h = Math.round(h * ms / w); w = ms; }
        else { w = Math.round(w * ms / h); h = ms; }
      }
      var c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve({
        dataUrl: c.toDataURL('image/jpeg', quality || 0.82),
        width: w,
        height: h
      });
    };
    img.onerror = function() {
      resolve({ dataUrl: dataUrl, width: 1000, height: 750 });
    };
    img.src = dataUrl;
  });
}

function getDataUrlDimensions(dataUrl) {
  return new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() {
      resolve({ width: img.naturalWidth || img.width || 1200, height: img.naturalHeight || img.height || 840 });
    };
    img.onerror = function() { resolve({ width: 1200, height: 840 }); };
    img.src = dataUrl;
  });
}

function calcDocxEmu(imgW, imgH, maxW, maxH) {
  var w = imgW || 1000;
  var h = imgH || 750;
  var ratio = w / h;
  var cx = maxW;
  var cy = Math.round(cx / ratio);
  if (cy > maxH) {
    cy = maxH;
    cx = Math.round(cy * ratio);
  }
  return { cx: cx, cy: cy };
}

async function openStampedPhotoPreview(ptId, phId) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  saveActivePoint(true);
  var ph = (pt.photos || []).find(function(p) { return p.id === phId; });
  if (!ph) return;

  var stampedDataUrl = await buildStampedPhotoDataUrl(pt, ph);
  var previewImg = document.getElementById('photoPreviewImg');
  previewImg.src = stampedDataUrl;
  document.getElementById('photoPreviewTitle').textContent = ph.fileName || pt.code;
  var shareBtn = document.getElementById('btnSharePreviewPhoto');
  shareBtn.onclick = function() {
    savePhotoWithAttributesToGallery(pt.id, ph.id);
  };
  document.getElementById('photoPreviewModal').classList.add('active');
}

function closePhotoPreviewModal() {
  document.getElementById('photoPreviewModal').classList.remove('active');
  document.getElementById('photoPreviewImg').src = '';
}

/* SAVE FULL-RES STAMPED PHOTO DIRECTLY TO IOS PHOTOS GALLERY VIA NATIVE IMAGE SHARE */
async function savePhotoWithAttributesToGallery(ptId, phId) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  saveActivePoint(true);
  var ph = (pt.photos || []).find(function(p) { return p.id === phId; });
  if (!ph) return;

  var stampedDataUrl = await buildStampedPhotoDataUrl(pt, ph);
  var blob = dataUrlToBlob(stampedDataUrl);
  var fileName = ph.fileName || 'photo.jpg';

  /* Passing ONLY { files: [fileObj] } without title/text makes iOS show "Save Image" to Photos */
  if (navigator.canShare && typeof File !== 'undefined') {
    try {
      var fileObj = new File([blob], fileName, { type: 'image/jpeg' });
      if (navigator.canShare({ files: [fileObj] })) {
        await navigator.share({ files: [fileObj] });
        return;
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }
  triggerBlobDownload(blob, fileName);
}

async function saveAllPointPhotosToGallery() {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt || !pt.photos || !pt.photos.length) return;
  saveActivePoint(true);

  if (navigator.canShare && typeof File !== 'undefined') {
    try {
      var filesArr = [];
      for (var i = 0; i < pt.photos.length; i++) {
        var ph = pt.photos[i];
        var sUrl = await buildStampedPhotoDataUrl(pt, ph);
        var b = dataUrlToBlob(sUrl);
        filesArr.push(new File([b], ph.fileName, { type: 'image/jpeg' }));
      }
      if (navigator.canShare({ files: filesArr })) {
        await navigator.share({ files: filesArr });
        return;
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }

  for (var j = 0; j < pt.photos.length; j++) {
    var phItem = pt.photos[j];
    var stUrl = await buildStampedPhotoDataUrl(pt, phItem);
    triggerBlobDownload(dataUrlToBlob(stUrl), phItem.fileName);
  }
}

/* SAVE 100% ORIGINAL IN IDB photo_originals AND LIGHT THUMBNAIL IN RAM */
async function addPhotoFilesToPoint(ptId, fileList) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt || !fileList || !fileList.length) return;
  var files = Array.from(fileList).filter(function(f) {
    return f && (!f.type || f.type.indexOf('image/') === 0 || /\.(jpe?g|png|webp|heic|bmp)$/i.test(f.name || ''));
  });
  if (!files.length) return;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var exifInfo = await extractExifFromBlob(file);
    var fullDataUrl = await blobToDataUrl(file);
    var ts = exifInfo.dateIso || (file.lastModified ? new Date(file.lastModified).toISOString() : new Date().toISOString());
    var phId = 'ph_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6) + '_' + i;

    await savePhotoOriginalToIDB(phId, file);
    var thumbUrl = await buildPhotoThumbDataUrl(fullDataUrl, 480, 0.78, 0);

    var newPh = {
      id: phId,
      fileName: buildPhotoFileName(pt, pt.photos.length, ts),
      timestamp: ts,
      rotation: 0,
      inDoc: true,
      inAlbum: (pt.type === 'OB'),
      thumbUrl: thumbUrl
    };
    pt.photos.push(newPh);
  }

  if (state.selectedPtId === pt.id) {
    renderPointPhotos(pt);
  }
  if (document.getElementById('photoTableModal').classList.contains('active')) {
    renderPhotoTableModal();
  }
  renderAxesAndMarkers();
  saveState();
}

async function handlePointPhotos(e) {
  var files = Array.from(e.target.files || []);
  e.target.value = '';
  if (!state.selectedPtId || !files.length) return;
  await addPhotoFilesToPoint(state.selectedPtId, files);
}

function onPointDropzoneDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  var el = document.getElementById('ptPhotoDropzone');
  if (el) el.classList.add('dragover');
}

function onPointDropzoneDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  var el = document.getElementById('ptPhotoDropzone');
  if (el) el.classList.remove('dragover');
}

async function onPointDropzoneDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  var el = document.getElementById('ptPhotoDropzone');
  if (el) el.classList.remove('dragover');
  if (!state.selectedPtId) return;
  var files = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : [];
  if (files.length) {
    await addPhotoFilesToPoint(state.selectedPtId, files);
  }
}

window.addEventListener('paste', async function(e) {
  var pointModalEl = document.getElementById('pointModal');
  if (!pointModalEl || !pointModalEl.classList.contains('active') || !state.selectedPtId) return;
  var items = (e.clipboardData && e.clipboardData.items) ? Array.from(e.clipboardData.items) : [];
  var imgFiles = [];
  items.forEach(function(item) {
    if (item.kind === 'file' && item.type && item.type.indexOf('image/') === 0) {
      var f = item.getAsFile();
      if (f) imgFiles.push(f);
    }
  });
  if (imgFiles.length) {
    e.preventDefault();
    await addPhotoFilesToPoint(state.selectedPtId, imgFiles);
  }
});

async function rotatePhoto90(ptId, phId) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  var ph = (pt.photos || []).find(function(p) { return p.id === phId; });
  if (!ph) return;
  ph.rotation = ((ph.rotation || 0) + 90) % 360;
  var origUrl = await getPhotoOriginalDataUrl(ph);
  ph.thumbUrl = await buildPhotoThumbDataUrl(origUrl, 480, 0.78, ph.rotation);
  saveState();
  if (state.selectedPtId === pt.id) {
    renderPointPhotos(pt);
  }
  if (document.getElementById('photoTableModal').classList.contains('active')) {
    renderPhotoTableModal();
  }
}

function togglePhotoInDoc(phId, checked) {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  var ph = pt.photos.find(function(p) { return p.id === phId; });
  if (ph) {
    ph.inDoc = !!checked;
    saveState();
  }
}

function togglePhotoInAlbum(phId, checked) {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  var ph = pt.photos.find(function(p) { return p.id === phId; });
  if (ph) {
    ph.inAlbum = !!checked;
    if (checked && !isPointInPhotoAlbum(pt)) {
      pt.inPhotoAlbum = true;
      var chkPt = document.getElementById('ptInPhotoAlbum');
      if (chkPt) chkPt.checked = true;
    }
    saveState();
    renderPointPhotos(pt);
    renderAxesAndMarkers();
  }
}

function renderPointPhotos(pt) {
  var box = document.getElementById('ptPhotosBox');
  var btnAll = document.getElementById('btnSaveAllPhotosGallery');
  if (!pt.photos.length) {
    box.innerHTML = '<div style="grid-column:1/-1; font-size:11px; color:var(--text-muted);">' + U.noPhotos + '</div>';
    if (btnAll) btnAll.style.display = 'none';
    return;
  }
  if (btnAll) btnAll.style.display = 'block';
  var albumMap = computePhotoAlbumMap();

  box.innerHTML = pt.photos.map(function(ph, i) {
    var isChecked = (ph.inDoc !== false) ? 'checked' : '';
    var isAlbumChecked = isPhotoInAlbum(pt, ph) ? 'checked' : '';
    var figNum = albumMap.byPhotoId[ph.id];
    var figTag = figNum ? (' <span style="background:#fef08a;color:#09090b;padding:0 5px;border-radius:8px;font-weight:800;">' + U.figWord + figNum + '</span>') : '';
    var previewSrc = ph.thumbUrl || ph.dataUrl || '';
    return '<div class="photo-card">' +
      '<img src="' + previewSrc + '" onclick="openStampedPhotoPreview(\'' + pt.id + '\', \'' + ph.id + '\')">' +
      '<div class="photo-meta">' +
        '<div><b>#' + (i + 1) + '</b> ' + ph.fileName + figTag + '</div>' +
        '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px; gap:4px; flex-wrap:wrap;">' +
          '<div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">' +
            '<label style="display:flex; align-items:center; gap:3px; font-size:10.5px; color:#f4f4f5; cursor:pointer;">' +
              '<input type="checkbox" style="width:14px; height:14px; margin:0;" ' + isChecked + ' onchange="togglePhotoInDoc(\'' + ph.id + '\', this.checked)"> ' + U.inDocLabel +
            '</label>' +
            '<label style="display:flex; align-items:center; gap:3px; font-size:10.5px; color:#fef08a; font-weight:700; cursor:pointer;">' +
              '<input type="checkbox" style="width:14px; height:14px; margin:0;" ' + isAlbumChecked + ' onchange="togglePhotoInAlbum(\'' + ph.id + '\', this.checked)"> ' + U.inAlbumLabel +
            '</label>' +
          '</div>' +
          '<div style="display:flex; gap:4px;">' +
            '<button type="button" style="background:#3f3f46; color:#fff; border:1px solid #52525b; border-radius:4px; padding:2px 6px; font-size:11px; font-weight:700; cursor:pointer;" title="\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043D\u0430 90\u00B0" onclick="rotatePhoto90(\'' + pt.id + '\', \'' + ph.id + '\')">\u21BB</button>' +
            '<button type="button" style="background:#0284c7; color:#fff; border:none; border-radius:4px; padding:3px 7px; font-size:10.5px; font-weight:700; cursor:pointer;" onclick="savePhotoWithAttributesToGallery(\'' + pt.id + '\', \'' + ph.id + '\')">' + U.toGalleryBtn + '</button>' +
            '<button type="button" class="btn-del" style="padding:2px 6px; font-size:10px;" onclick="removePhoto(\'' + ph.id + '\')">X</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function removePhoto(phId) {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  deletePhotoOriginalFromIDB(phId);
  pt.photos = pt.photos.filter(function(p) { return p.id !== phId; });
  refreshPointPhotoNames(pt);
  renderPointPhotos(pt);
  renderAxesAndMarkers();
  saveState();
}

function computeAxesForCoords(x, y, page) {
  var v = state.axes.vertical.filter(function(a) {
    if (a.page !== page) return false;
    if (isAxisLimitedV(a)) {
      var yMin = Math.min(a.y1, a.y2), yMax = Math.max(a.y1, a.y2);
      return y >= yMin && y <= yMax;
    }
    return true;
  }).sort(function(a, b) { return a.x - b.x; });

  var h = state.axes.horizontal.filter(function(a) {
    if (a.page !== page) return false;
    if (isAxisLimitedH(a)) {
      var xMin = Math.min(a.x1, a.x2), xMax = Math.max(a.x1, a.x2);
      return x >= xMin && x <= xMax;
    }
    return true;
  }).sort(function(a, b) { return a.y - b.y; });

  if (!v.length && !h.length) return '';

  var vp = v.length === 1 ? v[0].label : '';
  if (v.length >= 2) {
    var l = v[0].label, r = v[v.length - 1].label;
    for (var i = 0; i < v.length - 1; i++) {
      if (x >= v[i].x && x <= v[i + 1].x) { l = v[i].label; r = v[i + 1].label; break; }
    }
    vp = l + '-' + r;
  }

  var hp = h.length === 1 ? h[0].label : '';
  if (h.length >= 2) {
    var b = h[0].label, t = h[h.length - 1].label;
    for (var j = 0; j < h.length - 1; j++) {
      if (y >= h[j].y && y <= h[j + 1].y) { b = h[j].label; t = h[j + 1].label; break; }
    }
    hp = b + '-' + t;
  }
  return [hp, vp].filter(Boolean).join(' / ');
}

function computeAxesForAreaOrPoint(x, y, areaCoords, page) {
  if (!Array.isArray(areaCoords) || areaCoords.length < 3) {
    return computeAxesForCoords(x, y, page);
  }
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  areaCoords.forEach(function(c) {
    if (c[1] < minX) minX = c[1];
    if (c[1] > maxX) maxX = c[1];
    if (c[0] < minY) minY = c[0];
    if (c[0] > maxY) maxY = c[0];
  });

  var v = state.axes.vertical.filter(function(a) {
    if (a.page !== page) return false;
    if (isAxisLimitedV(a)) {
      var yMin = Math.min(a.y1, a.y2), yMax = Math.max(a.y1, a.y2);
      return maxY >= yMin && minY <= yMax;
    }
    return true;
  }).sort(function(a, b) { return a.x - b.x; });

  var h = state.axes.horizontal.filter(function(a) {
    if (a.page !== page) return false;
    if (isAxisLimitedH(a)) {
      var xMin = Math.min(a.x1, a.x2), xMax = Math.max(a.x1, a.x2);
      return maxX >= xMin && minX <= xMax;
    }
    return true;
  }).sort(function(a, b) { return a.y - b.y; });

  if (!v.length && !h.length) return '';

  var vp = v.length === 1 ? v[0].label : '';
  if (v.length >= 2) {
    var iL = 0, iR = v.length - 1;
    for (var i = 0; i < v.length - 1; i++) {
      if (minX >= v[i].x && minX <= v[i + 1].x) { iL = i; break; }
    }
    for (var k = v.length - 1; k > 0; k--) {
      if (maxX >= v[k - 1].x && maxX <= v[k].x) { iR = k; break; }
    }
    if (iR <= iL) iR = Math.min(v.length - 1, iL + 1);
    vp = v[iL].label + '-' + v[iR].label;
  }

  var hp = h.length === 1 ? h[0].label : '';
  if (h.length >= 2) {
    var jB = 0, jT = h.length - 1;
    for (var j = 0; j < h.length - 1; j++) {
      if (minY >= h[j].y && minY <= h[j + 1].y) { jB = j; break; }
    }
    for (var m = h.length - 1; m > 0; m--) {
      if (maxY >= h[m - 1].y && maxY <= h[m].y) { jT = m; break; }
    }
    if (jT <= jB) jT = Math.min(h.length - 1, jB + 1);
    hp = h[jB].label + '-' + h[jT].label;
  }
  return [hp, vp].filter(Boolean).join(' / ');
}

function recalculateAllPointAxes() {
  var cnt = 0;
  state.points.forEach(function(pt) {
    var ax = computeAxesForAreaOrPoint(pt.x, pt.y, pt.areaCoords, pt.page || 1);
    if (ax) { pt.axes = ax; refreshPointPhotoNames(pt); cnt++; }
  });
  saveState();
  renderAxesAndMarkers();
  alert(U.axesUpdatedMsg + cnt);
}

function clearAllAxes() {
  if (!confirm(U.confirmClearAxes)) return;
  var p = state.currentPage || 1;
  state.axes.vertical = state.axes.vertical.filter(function(a) { return a.page !== p; });
  state.axes.horizontal = state.axes.horizontal.filter(function(a) { return a.page !== p; });
  saveState();
  renderAxesAndMarkers();
}

function syncStructuresListFromPoints() {
  if (!Array.isArray(state.settings.structures)) state.settings.structures = [];
  state.points.forEach(function(pt) {
    var s = String(pt.structure || '').trim();
    if (s && state.settings.structures.indexOf(s) === -1) {
      state.settings.structures.push(s);
    }
  });
}

function populateSelectors() {
  syncStructuresListFromPoints();
  var dl = document.getElementById('structuresDatalist');
  if (dl) {
    dl.innerHTML = state.settings.structures.map(function(s) {
      var safe = String(s).replace(/"/g, '&quot;');
      return '<option value="' + safe + '"></option>';
    }).join('');
  }
  document.getElementById('ptCategory').innerHTML = state.settings.defectCategories.map(function(c) { return '<option value="' + c + '">' + c + '</option>'; }).join('');
  document.getElementById('ptInstrument').innerHTML = state.settings.instruments.map(function(i) { return '<option value="' + i.id + '">' + i.name + ' (' + i.serial + ')</option>'; }).join('');
}

function renderCustomAttributesInputs(pt) {
  var box = document.getElementById('customAttrsBox');
  box.innerHTML = state.settings.customAttributes.map(function(a) {
    var val = (pt.customValues && pt.customValues[a.id]) || '';
    return '<div class="form-group">' +
      '<label>' + a.name + '</label>' +
      '<input type="' + (a.type === 'number' ? 'number' : 'text') + '" value="' + val + '" oninput="updateCustomAttr(\'' + a.id + '\', this.value)">' +
    '</div>';
  }).join('');
}

function updateCustomAttr(attrId, val) {
  var pt = state.points.find(function(p) { return p.id === state.selectedPtId; });
  if (!pt) return;
  if (!pt.customValues) pt.customValues = {};
  pt.customValues[attrId] = val;
  saveState();
}

function syncProjectUI() {
  document.getElementById('hdrCipherBtn').textContent = state.project.cipher;
  document.getElementById('prjCipher').value = state.project.cipher;
  document.getElementById('prjShort').value = state.project.shortName;
  document.getElementById('prjFull').value = state.project.fullName;
  document.getElementById('prjDate').value = state.project.date;
  document.getElementById('prjProtNum').value = state.project.protocolNum;
  document.getElementById('prjDirector').value = state.project.director;
  document.getElementById('prjGip').value = state.project.gip;
}

function openProjectModal() { document.getElementById('projectModal').classList.add('active'); }
function openReportsModal() { document.getElementById('reportsModal').classList.add('active'); }

function saveProjectMeta() {
  state.project.cipher = document.getElementById('prjCipher').value.trim();
  state.project.shortName = document.getElementById('prjShort').value.trim();
  state.project.fullName = document.getElementById('prjFull').value.trim();
  state.project.date = document.getElementById('prjDate').value;
  state.project.protocolNum = document.getElementById('prjProtNum').value.trim();
  state.project.director = document.getElementById('prjDirector').value.trim();
  state.project.gip = document.getElementById('prjGip').value.trim();
  document.getElementById('hdrCipherBtn').textContent = state.project.cipher;
  state.points.forEach(function(pt) { refreshPointPhotoNames(pt); });
  document.getElementById('projectModal').classList.remove('active');
  saveState();
}

function openSettingsModal() {
  populateSelectors();
  renderSettingsLists();
  document.getElementById('settingsModal').classList.add('active');
}

function renderSettingsLists() {
  document.getElementById('instListBox').innerHTML = state.settings.instruments.map(function(inst, i) {
    return '<div style="display:flex; justify-content:space-between; background:#18181b; padding:5px 8px; border-radius:5px; font-size:11.5px;">' +
      '<span><b>' + inst.name + '</b> (' + inst.serial + ')</span>' +
      '<button type="button" onclick="state.settings.instruments.splice(' + i + ',1);populateSelectors();renderSettingsLists();saveState();" style="background:#991b1b;color:#fff;border:none;border-radius:4px;padding:1px 6px;cursor:pointer;">X</button>' +
    '</div>';
  }).join('');

  var sBox = document.getElementById('structListBox');
  if (sBox) {
    sBox.innerHTML = (state.settings.structures || []).map(function(stName, i) {
      var safeVal = String(stName).replace(/"/g, '&quot;');
      return '<div style="display:flex; gap:6px; align-items:center; background:#18181b; padding:4px 6px; border-radius:5px;">' +
        '<input type="text" value="' + safeVal + '" onchange="renameStructureGlobal(' + i + ', this.value)" style="flex:1; padding:4px 7px; font-size:12px;">' +
        '<button type="button" onclick="deleteStructureItem(' + i + ')" style="background:#991b1b;color:#fff;border:none;border-radius:4px;padding:4px 8px;cursor:pointer;">X</button>' +
      '</div>';
    }).join('');
  }

  document.getElementById('attrListBox').innerHTML = state.settings.customAttributes.map(function(a, i) {
    return '<div style="display:flex; justify-content:space-between; background:#18181b; padding:5px 8px; border-radius:5px; font-size:11.5px;">' +
      '<span><b>' + a.name + '</b> [' + a.type + ']</span>' +
      '<button type="button" onclick="state.settings.customAttributes.splice(' + i + ',1);renderSettingsLists();saveState();" style="background:#991b1b;color:#fff;border:none;border-radius:4px;padding:1px 6px;cursor:pointer;">X</button>' +
    '</div>';
  }).join('');
}

function renameStructureGlobal(idx, newNameRaw) {
  var oldName = state.settings.structures[idx];
  var newName = String(newNameRaw || '').trim();
  if (!newName || newName === oldName) {
    renderSettingsLists();
    return;
  }
  state.settings.structures[idx] = newName;
  state.points.forEach(function(pt) {
    if (pt.structure === oldName) {
      pt.structure = newName;
      refreshPointPhotoNames(pt);
    }
  });
  /* Deduplicate if renamed to an existing item */
  state.settings.structures = state.settings.structures.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
  });
  populateSelectors();
  renderSettingsLists();
  if (state.selectedPtId) {
    var activePt = state.points.find(function(p) { return p.id === state.selectedPtId; });
    if (activePt) document.getElementById('ptStructure').value = activePt.structure || '';
  }
  if (document.getElementById('tableModal').classList.contains('active')) {
    renderTableModal();
  }
  saveState();
}

function deleteStructureItem(idx) {
  state.settings.structures.splice(idx, 1);
  populateSelectors();
  renderSettingsLists();
  saveState();
}

function addStructureFromSettings() {
  var inp = document.getElementById('newStructName');
  var name = inp.value.trim();
  if (!name) return;
  ensureStructureInList(name);
  inp.value = '';
  renderSettingsLists();
}

function addInstrument() {
  var name = document.getElementById('newInstName').value.trim();
  if (!name) return;
  state.settings.instruments.push({
    id: 'inst_' + Date.now(),
    name: name,
    serial: document.getElementById('newInstSerial').value.trim() || '\u0431/\u043D',
    gost: document.getElementById('newInstGost').value.trim() || '\u0413\u041E\u0421\u0422 22690-2015'
  });
  document.getElementById('newInstName').value = '';
  populateSelectors(); renderSettingsLists(); saveState();
}

function addCustomAttribute() {
  var name = document.getElementById('newAttrName').value.trim();
  if (!name) return;
  state.settings.customAttributes.push({ id: 'attr_' + Date.now(), name: name, type: document.getElementById('newAttrType').value });
  document.getElementById('newAttrName').value = '';
  renderSettingsLists();
  if (state.selectedPtId) openPointModal(state.selectedPtId);
  saveState();
}

function downloadSettingsTemplate() {
  var blob = new Blob([JSON.stringify(state.settings, null, 2)], { type: 'application/json' });
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'settings_template.json'; a.click();
}

function uploadSettingsTemplate(e) {
  var f = e.target.files[0]; if (!f) return;
  var r = new FileReader();
  r.onload = function(ev) {
    state.settings = JSON.parse(ev.target.result);
    populateSelectors(); renderSettingsLists(); saveState();
  };
  r.readAsText(f);
  e.target.value = '';
}

function openTableModal() {
  renderTableModal();
  document.getElementById('tableModal').classList.add('active');
}
function closeTableModal() { document.getElementById('tableModal').classList.remove('active'); }

function renderTableModal() {
  var fType = document.getElementById('tblFilterType').value;
  var customCols = state.settings.customAttributes;

  document.getElementById('tblHead').innerHTML =
    '<th><input type="checkbox" onchange="document.querySelectorAll(\'.row-chk\').forEach(function(c){c.checked=this.checked}.bind(this))"></th>' +
    '<th>ID</th><th>\u041E\u0441\u0438</th><th>\u0423\u0447\u0430\u0441\u0442\u043E\u043A</th><th>\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F</th><th>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</th><th>\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B</th>' +
    customCols.map(function(c) { return '<th>' + c.name + '</th>'; }).join('') +
    '<th>\u0424\u043E\u0442\u043E</th><th></th>';

  var rows = state.points.filter(function(p) { return !p.deleted && (fType === 'ALL' || p.type === fType); });
  document.getElementById('tblBody').innerHTML = rows.map(function(pt) {
    var safeStruct = String(pt.structure || '').replace(/"/g, '&quot;');
    var structSelectHtml = '<input type="text" list="structuresDatalist" value="' + safeStruct + '" onchange="tblUpdate(\'' + pt.id + '\',\'structure\',this.value)" style="min-width:155px;">';

    var paramCellHtml = '-';
    if (pt.type === 'D') {
      var catList = state.settings.defectCategories.slice();
      if (pt.category && catList.indexOf(pt.category) === -1) catList.unshift(pt.category);
      var catSel = '<select onchange="tblUpdate(\'' + pt.id + '\',\'category\',this.value)" style="min-width:165px;">' +
        catList.map(function(cat) {
          var sel = (cat === pt.category) ? ' selected' : '';
          return '<option value="' + cat + '"' + sel + '>' + cat + '</option>';
        }).join('') +
      '</select>';
      var styleOpts = [
        { v: 'point', l: '\u25CF \u0422\u043E\u0447\u043A\u0430' },
        { v: 'fill', l: '\u25A0 \u0417\u0430\u043B\u0438\u0432\u043A\u0430' },
        { v: 'hatch45', l: '\u2571 \u0428\u0442\u0440\u0438\u0445 45\u00B0' },
        { v: 'cross', l: '\u2573 \u0421\u0435\u0442\u043A\u0430' }
      ];
      var curStyle = pt.areaStyle || 'point';
      var styleSel = '<select onchange="tblUpdateAreaStyle(\'' + pt.id + '\',this.value)" style="width:105px;">' +
        styleOpts.map(function(o) {
          return '<option value="' + o.v + '"' + (o.v === curStyle ? ' selected' : '') + '>' + o.l + '</option>';
        }).join('') +
      '</select>';
      var colorOpts = [
        { v: '#ef4444', l: '\uD83D\uDD34' },
        { v: '#f59e0b', l: '\uD83D\uDFE0' },
        { v: '#0ea5e9', l: '\uD83D\uDD35' },
        { v: '#22c55e', l: '\uD83D\uDFE2' },
        { v: '#9333ea', l: '\uD83D\uDFE3' },
        { v: '#a16207', l: '\uD83D\uDFE4' }
      ];
      var curCol = pt.areaColor || '#ef4444';
      var colSel = '<select onchange="tblUpdate(\'' + pt.id + '\',\'areaColor\',this.value)" style="width:52px;">' +
        colorOpts.map(function(o) {
          return '<option value="' + o.v + '"' + (o.v === curCol ? ' selected' : '') + '>' + o.l + '</option>';
        }).join('') +
      '</select>';
      paramCellHtml = '<div style="display:flex;flex-direction:column;gap:4px;">' + catSel +
        '<div style="display:flex;gap:4px;">' + styleSel + colSel + '</div></div>';
    } else if (pt.type === 'PR') {
      paramCellHtml = '<div style="display:flex;gap:4px;align-items:center;min-width:155px;">' +
        '<input type="number" step="0.1" value="' + (pt.mpa || '') + '" placeholder="\u041C\u041F\u0430" onchange="tblUpdateMpa(\'' + pt.id + '\',this.value)" style="width:72px;">' +
        '<input type="text" id="tblCls_' + pt.id + '" value="' + (pt.concreteClass || '') + '" placeholder="B..." onchange="tblUpdate(\'' + pt.id + '\',\'concreteClass\',this.value)" style="width:65px;">' +
      '</div>';
    } else if (pt.type === 'VS') {
      paramCellHtml = '<textarea onchange="tblUpdate(\'' + pt.id + '\',\'openingResult\',this.value)" style="min-width:160px;min-height:42px;">' + (pt.openingResult || '') + '</textarea>';
    }

    return '<tr>' +
      '<td><input type="checkbox" class="row-chk" data-id="' + pt.id + '"></td>' +
      '<td><input value="' + pt.code + '" onchange="tblUpdate(\'' + pt.id + '\',\'code\',this.value)" style="width:65px;"></td>' +
      '<td><input value="' + (pt.axes || '') + '" onchange="tblUpdate(\'' + pt.id + '\',\'axes\',this.value)" style="width:115px;"></td>' +
      '<td><input value="' + (pt.zone || '') + '" onchange="tblUpdate(\'' + pt.id + '\',\'zone\',this.value)" style="width:105px;"></td>' +
      '<td>' + structSelectHtml + '</td>' +
      '<td><textarea onchange="tblUpdate(\'' + pt.id + '\',\'description\',this.value)" style="min-width:200px;min-height:42px;">' + (pt.description || '') + '</textarea></td>' +
      '<td>' + paramCellHtml + '</td>' +
      customCols.map(function(c) {
        var v = (pt.customValues && pt.customValues[c.id]) || '';
        return '<td><input value="' + v + '" onchange="tblCustomUpdate(\'' + pt.id + '\',\'' + c.id + '\',this.value)" style="width:90px;"></td>';
      }).join('') +
      '<td>' + pt.photos.length + '</td>' +
      '<td style="white-space:nowrap;">' +
        '<button type="button" onclick="closeTableModal();openPointModal(\'' + pt.id + '\')" style="margin-right:4px;cursor:pointer;">\u270F\uFE0F</button>' +
        '<button type="button" class="btn-del" style="padding:4px 7px;font-size:11px;" onclick="tblDeletePoint(\'' + pt.id + '\')">\uD83D\uDDD1</button>' +
      '</td>' +
    '</tr>';
  }).join('');
}

function tblUpdate(id, field, val) {
  var pt = state.points.find(function(p) { return p.id === id; });
  if (pt) {
    pt[field] = val;
    pt.updatedAt = Date.now();
    if (field === 'structure') ensureStructureInList(val);
    refreshPointPhotoNames(pt);
    saveState();
    renderAxesAndMarkers();
  }
}

function tblUpdateAreaStyle(id, st) {
  var pt = state.points.find(function(p) { return p.id === id; });
  if (!pt) return;
  pt.areaStyle = st;
  pt.updatedAt = Date.now();
  if (st !== 'point' && (!Array.isArray(pt.areaCoords) || pt.areaCoords.length < 3)) {
    var x1 = Math.max(0, pt.x - 40), x2 = Math.min(PLAN_W, pt.x + 40);
    var y1 = Math.max(0, pt.y - 28), y2 = Math.min(PLAN_H, pt.y + 28);
    pt.areaCoords = [[y1, x1], [y1, x2], [y2, x2], [y2, x1]];
  }
  saveState();
  renderAxesAndMarkers();
}

function tblUpdateMpa(id, val) {
  var pt = state.points.find(function(p) { return p.id === id; });
  if (!pt) return;
  pt.mpa = val;
  pt.updatedAt = Date.now();
  var num = parseFloat(val);
  if (!isNaN(num) && num > 0) {
    pt.concreteClass = estimateConcreteClass(num);
    var clsInp = document.getElementById('tblCls_' + id);
    if (clsInp) clsInp.value = pt.concreteClass;
  }
  saveState();
  renderAxesAndMarkers();
}

function tblCustomUpdate(id, attrId, val) {
  var pt = state.points.find(function(p) { return p.id === id; });
  if (pt) {
    if (!pt.customValues) pt.customValues = {};
    pt.customValues[attrId] = val;
    pt.updatedAt = Date.now();
    saveState();
  }
}

function tblDeletePoint(id) {
  if (!confirm(U.confirmDelPt)) return;
  var pt = state.points.find(function(p) { return p.id === id; });
  if (pt) {
    pt.deleted = true;
    pt.updatedAt = Date.now();
  }
  saveState();
  renderTableModal();
  renderAxesAndMarkers();
  updateStatusText();
}

function batchDeleteSelectedPoints() {
  var ids = Array.from(document.querySelectorAll('.row-chk:checked')).map(function(c) { return c.dataset.id; });
  if (!ids.length) { alert(U.selectPtsFirst); return; }
  if (!confirm(U.confirmDelSelectedPts + ' (' + ids.length + ')')) return;
  var nowTs = Date.now();
  state.points.forEach(function(pt) {
    if (ids.indexOf(pt.id) !== -1) {
      pt.deleted = true;
      pt.updatedAt = nowTs;
    }
  });
  saveState();
  renderTableModal();
  renderAxesAndMarkers();
  updateStatusText();
}

function batchAssignAxesPrompt() {
  var ids = Array.from(document.querySelectorAll('.row-chk:checked')).map(function(c) { return c.dataset.id; });
  if (!ids.length) { alert(U.selectPtsFirst); return; }
  var ax = prompt('\u041E\u0441\u0438:', '\u0410-\u0411 / 1-2');
  if (ax === null) return;
  var nowTs = Date.now();
  state.points.forEach(function(p) {
    if (ids.indexOf(p.id) !== -1) {
      p.axes = ax.trim();
      p.updatedAt = nowTs;
      refreshPointPhotoNames(p);
    }
  });
  saveState(); renderTableModal(); renderAxesAndMarkers();
}

function renumberAllPoints() {
  var cnt = { D: 1, VS: 1, PR: 1, OB: 1 };
  var nowTs = Date.now();
  state.points.forEach(function(p) {
    if (p.deleted) return;
    var n = cnt[p.type]++;
    if (p.type === 'OB') {
      p.code = String(n);
    } else {
      var pref = TYPE_PREFIX[p.type] || p.type;
      p.code = pref + n;
    }
    p.updatedAt = nowTs;
    refreshPointPhotoNames(p);
  });
  saveState(); renderTableModal(); renderAxesAndMarkers();
}

var ptblUploadTargetPtId = null;

function openPhotoTableModal() {
  populateSelectors();
  renderPhotoTableModal();
  document.getElementById('photoTableModal').classList.add('active');
}

function closePhotoTableModal() {
  document.getElementById('photoTableModal').classList.remove('active');
  renderAxesAndMarkers();
}

function triggerPhotoTableAddPhoto(ptId) {
  ptblUploadTargetPtId = ptId;
  document.getElementById('ptblPhotoInput').click();
}

async function handlePhotoTableUpload(e) {
  var files = Array.from(e.target.files || []);
  e.target.value = '';
  if (!ptblUploadTargetPtId || !files.length) return;
  await addPhotoFilesToPoint(ptblUploadTargetPtId, files);
}

function onPtblCellDragOver(e, el) {
  e.preventDefault();
  e.stopPropagation();
  if (el) el.classList.add('dragover');
}

function onPtblCellDragLeave(e, el) {
  e.preventDefault();
  e.stopPropagation();
  if (el) el.classList.remove('dragover');
}

async function onPtblCellDrop(e, ptId, el) {
  e.preventDefault();
  e.stopPropagation();
  if (el) el.classList.remove('dragover');
  var files = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : [];
  if (files.length && ptId) {
    await addPhotoFilesToPoint(ptId, files);
  }
}

function ptblTogglePointInAlbum(ptId, checked) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  pt.inPhotoAlbum = !!checked;
  saveState();
  renderPhotoTableModal();
  renderAxesAndMarkers();
}

function ptblTogglePhotoInDoc(ptId, phId, checked) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  var ph = (pt.photos || []).find(function(p) { return p.id === phId; });
  if (ph) {
    ph.inDoc = !!checked;
    saveState();
  }
}

function ptblTogglePhotoInAlbum(ptId, phId, checked) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  var ph = (pt.photos || []).find(function(p) { return p.id === phId; });
  if (ph) {
    ph.inAlbum = !!checked;
    if (checked && !isPointInPhotoAlbum(pt)) {
      pt.inPhotoAlbum = true;
    }
    saveState();
    renderPhotoTableModal();
    renderAxesAndMarkers();
  }
}

function ptblRemovePhoto(ptId, phId) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  deletePhotoOriginalFromIDB(phId);
  pt.photos = (pt.photos || []).filter(function(p) { return p.id !== phId; });
  refreshPointPhotoNames(pt);
  saveState();
  renderPhotoTableModal();
  renderAxesAndMarkers();
}

function ptblUpdateField(ptId, field, val) {
  var pt = state.points.find(function(p) { return p.id === ptId; });
  if (!pt) return;
  pt[field] = val;
  pt.updatedAt = Date.now();
  if (field === 'structure') ensureStructureInList(val);
  if (field === 'mpa') {
    var num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      pt.concreteClass = estimateConcreteClass(num);
      var clsEl = document.getElementById('ptblCls_' + pt.id);
      if (clsEl) clsEl.value = pt.concreteClass;
    }
  }
  refreshPointPhotoNames(pt);
  saveState();
  renderAxesAndMarkers();
}

function renderPhotoTableModal() {
  var fType = document.getElementById('ptblFilterType').value;
  var onlyWithPhotos = document.getElementById('ptblHideEmpty').checked;
  var hidePhotos = document.getElementById('ptblHidePhotos').checked;
  var albumMap = computePhotoAlbumMap();

  document.getElementById('ptblHead').innerHTML =
    '<th style="width:170px;">\u0422\u043E\u0447\u043A\u0430 / \u041E\u0441\u0438</th>' +
    (hidePhotos ? '' : '<th style="min-width:250px;">\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 (\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F 100% \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 | Drag &amp; Drop)</th>') +
    '<th style="min-width:280px;">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</th>' +
    '<th style="width:220px;">\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F / \u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B</th>';

  var rows = state.points.filter(function(pt) {
    if (pt.deleted) return false;
    if (fType !== 'ALL' && pt.type !== fType) return false;
    if (onlyWithPhotos && (!pt.photos || !pt.photos.length)) return false;
    return true;
  });

  document.getElementById('ptblBody').innerHTML = rows.map(function(pt) {
    var ptInAlb = isPointInPhotoAlbum(pt) ? 'checked' : '';
    var figNums = albumMap.byPointId[pt.id] || [];
    var figBadge = figNums.length
      ? ('<div style="margin-top:4px; background:#fef08a; color:#09090b; padding:2px 6px; border-radius:6px; font-weight:800; font-size:11px; display:inline-block;">' + U.figWord + figNums.join(', ') + '</div>')
      : '';

    var dropAttrs = ' class="ptbl-drop-cell" ondragover="onPtblCellDragOver(event, this)" ondragleave="onPtblCellDragLeave(event, this)" ondrop="onPtblCellDrop(event, \'' + pt.id + '\', this)"';

    var col1Html =
      '<div style="display:flex; flex-direction:column; gap:5px;">' +
        '<div style="display:flex; gap:4px; align-items:center;">' +
          '<input type="text" value="' + String(pt.code || '').replace(/"/g, '&quot;') + '" onchange="ptblUpdateField(\'' + pt.id + '\',\'code\',this.value)" style="font-weight:800; width:75px;">' +
          '<button type="button" onclick="closePhotoTableModal();openPointModal(\'' + pt.id + '\')" style="background:#3f3f46;color:#fff;border:1px solid #52525b;border-radius:6px;padding:4px 7px;cursor:pointer;" title="\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430">\u270F\uFE0F</button>' +
        '</div>' +
        '<input type="text" value="' + String(pt.axes || '').replace(/"/g, '&quot;') + '" placeholder="\u041E\u0441\u0438 (\u0410-\u0411 / 1-2)" onchange="ptblUpdateField(\'' + pt.id + '\',\'axes\',this.value)" style="font-size:12px;">' +
        '<input type="text" value="' + String(pt.zone || '').replace(/"/g, '&quot;') + '" placeholder="\u0423\u0447\u0430\u0441\u0442\u043E\u043A / \u042D\u0442\u0430\u0436" onchange="ptblUpdateField(\'' + pt.id + '\',\'zone\',this.value)" style="font-size:11.5px;">' +
        '<label style="display:flex; align-items:center; gap:4px; font-size:11px; color:#fef08a; font-weight:700; cursor:pointer; margin-top:2px;">' +
          '<input type="checkbox" style="width:14px; height:14px; margin:0;" ' + ptInAlb + ' onchange="ptblTogglePointInAlbum(\'' + pt.id + '\', this.checked)"> ' + U.inAlbumLabel +
        '</label>' +
        figBadge +
        '<button type="button"' + dropAttrs + ' onclick="triggerPhotoTableAddPhoto(\'' + pt.id + '\')" style="background:#2563eb; color:#fff; border:none; border-radius:6px; padding:5px 8px; font-size:11px; font-weight:700; cursor:pointer; margin-top:2px;">\uD83D\uDCF7 + \u0424\u043E\u0442\u043E (' + (pt.photos ? pt.photos.length : 0) + ')</button>' +
      '</div>';

    var colPhotosHtml = '';
    if (!hidePhotos) {
      var cards = (pt.photos || []).map(function(ph, idx) {
        var inDocChk = (ph.inDoc !== false) ? 'checked' : '';
        var inAlbChk = isPhotoInAlbum(pt, ph) ? 'checked' : '';
        var fNum = albumMap.byPhotoId[ph.id];
        var fTag = fNum ? (' <span style="background:#fef08a;color:#09090b;padding:0 5px;border-radius:6px;font-weight:800;">' + U.figWord + fNum + '</span>') : '';
        var src = ph.thumbUrl || ph.dataUrl || '';
        return '<div class="ptbl-photo-item">' +
          '<img src="' + src + '" onclick="openStampedPhotoPreview(\'' + pt.id + '\', \'' + ph.id + '\')">' +
          '<div class="ptbl-photo-ctrl">' +
            '<div style="word-break:break-all;"><b>#' + (idx + 1) + '</b> ' + fTag + '</div>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; gap:4px; flex-wrap:wrap;">' +
              '<label style="display:flex; align-items:center; gap:3px; color:#f4f4f5; cursor:pointer;">' +
                '<input type="checkbox" style="width:13px; height:13px; margin:0;" ' + inDocChk + ' onchange="ptblTogglePhotoInDoc(\'' + pt.id + '\', \'' + ph.id + '\', this.checked)"> ' + U.inDocLabel +
              '</label>' +
              '<label style="display:flex; align-items:center; gap:3px; color:#fef08a; font-weight:700; cursor:pointer;">' +
                '<input type="checkbox" style="width:13px; height:13px; margin:0;" ' + inAlbChk + ' onchange="ptblTogglePhotoInAlbum(\'' + pt.id + '\', \'' + ph.id + '\', this.checked)"> ' + U.inAlbumLabel +
              '</label>' +
              '<div style="display:flex; gap:3px;">' +
                '<button type="button" style="background:#3f3f46; color:#fff; border:1px solid #52525b; border-radius:4px; padding:1px 5px; font-size:10px; font-weight:700; cursor:pointer;" title="\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043D\u0430 90\u00B0" onclick="rotatePhoto90(\'' + pt.id + '\', \'' + ph.id + '\')">\u21BB</button>' +
                '<button type="button" class="btn-del" style="padding:1px 5px; font-size:10px;" onclick="ptblRemovePhoto(\'' + pt.id + '\', \'' + ph.id + '\')">X</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');

      var emptyDropHint = '<div style="border:1px dashed #52525b; border-radius:7px; padding:16px 10px; text-align:center; color:var(--text-muted); font-size:11px; cursor:pointer;" onclick="triggerPhotoTableAddPhoto(\'' + pt.id + '\')">\uD83D\uDCE5 ' + U.noPhotos + ' (\u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0441\u044E\u0434\u0430 \u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435)</div>';
      colPhotosHtml = '<td' + dropAttrs + '>' + (cards ? ('<div class="ptbl-photo-list">' + cards + '</div>') : emptyDropHint) + '</td>';
    }

    var safeDesc = String(pt.description || '').replace(/</g, '&lt;');
    var colDescHtml =
      '<td>' +
        '<textarea onchange="ptblUpdateField(\'' + pt.id + '\',\'description\',this.value)" style="width:100%; min-height:135px; font-size:13px; line-height:1.35;">' + safeDesc + '</textarea>' +
      '</td>';

    var safeStruct = String(pt.structure || '').replace(/"/g, '&quot;');
    var extraParamHtml = '';
    if (pt.type === 'D') {
      var catList = state.settings.defectCategories.slice();
      if (pt.category && catList.indexOf(pt.category) === -1) catList.unshift(pt.category);
      extraParamHtml = '<select onchange="ptblUpdateField(\'' + pt.id + '\',\'category\',this.value)">' +
        catList.map(function(c) {
          return '<option value="' + c + '"' + (c === pt.category ? ' selected' : '') + '>' + c + '</option>';
        }).join('') +
      '</select>';
    } else if (pt.type === 'VS') {
      extraParamHtml = '<textarea placeholder="\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0432\u0441\u043A\u0440\u044B\u0442\u0438\u044F..." onchange="ptblUpdateField(\'' + pt.id + '\',\'openingResult\',this.value)" style="min-height:70px;">' + String(pt.openingResult || '').replace(/</g, '&lt;') + '</textarea>';
    } else if (pt.type === 'PR') {
      extraParamHtml = '<div style="display:flex; gap:4px;">' +
        '<input type="number" step="0.1" value="' + (pt.mpa || '') + '" placeholder="\u041C\u041F\u0430" onchange="ptblUpdateField(\'' + pt.id + '\',\'mpa\',this.value)">' +
        '<input type="text" id="ptblCls_' + pt.id + '" value="' + (pt.concreteClass || '') + '" placeholder="B..." onchange="ptblUpdateField(\'' + pt.id + '\',\'concreteClass\',this.value)">' +
      '</div>';
    }

    var colParamsHtml =
      '<td>' +
        '<div style="display:flex; flex-direction:column; gap:6px;">' +
          '<input type="text" list="structuresDatalist" value="' + safeStruct + '" placeholder="\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F..." onchange="ptblUpdateField(\'' + pt.id + '\',\'structure\',this.value)">' +
          extraParamHtml +
        '</div>' +
      '</td>';

    return '<tr><td' + dropAttrs + '>' + col1Html + '</td>' + colPhotosHtml + colDescHtml + colParamsHtml + '</tr>';
  }).join('');
}

/* GROUP DEFECTS BY INDIVIDUAL CODE FOR REPORTS */
function getGroupedDefectsForReports() {
  var groupsMap = {};
  var orderKeys = [];

  state.points.filter(function(p) { return !p.deleted && p.type === 'D'; }).forEach(function(pt) {
    var codes = String(pt.code || '').split(/[,;]+/).map(function(s) { return s.trim(); }).filter(Boolean);
    if (!codes.length) codes = [TYPE_PREFIX.D + '?'];
    var isSingleCode = (codes.length === 1);

    codes.forEach(function(c) {
      if (!groupsMap[c]) {
        groupsMap[c] = {
          code: c,
          axesList: [],
          descriptions: [],
          structures: [],
          categories: [],
          photos: [],
          photoIds: {}
        };
        orderKeys.push(c);
      }
      var g = groupsMap[c];
      if (pt.axes && g.axesList.indexOf(pt.axes) === -1) g.axesList.push(pt.axes);
      var dTrim = (pt.description || '').trim();
      if (dTrim && (isSingleCode || !g.descriptions.length) && g.descriptions.indexOf(dTrim) === -1) {
        g.descriptions.push(dTrim);
      }
      if (pt.structure && g.structures.indexOf(pt.structure) === -1) g.structures.push(pt.structure);
      if (pt.category && g.categories.indexOf(pt.category) === -1) g.categories.push(pt.category);

      (pt.photos || []).forEach(function(ph) {
        if (ph.inDoc !== false && !g.photoIds[ph.id]) {
          g.photoIds[ph.id] = true;
          g.photos.push(ph);
        }
      });
    });
  });

  orderKeys.sort(function(a, b) {
    var na = parseInt((a.match(/(\d+)/) || [])[1], 10);
    var nb = parseInt((b.match(/(\d+)/) || [])[1], 10);
    if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
    return a.localeCompare(b);
  });

  return orderKeys.map(function(k) {
    var g = groupsMap[k];
    return {
      code: g.code,
      axes: g.axesList.join('; '),
      description: g.descriptions.join('; '),
      structure: g.structures.join(', '),
      category: g.categories[0] || '',
      photos: g.photos
    };
  });
}

function triggerBlobDownload(blob, fileName) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 3000);
}

function dataUrlToBlob(dataUrl) {
  var parts = dataUrl.split(',');
  var mimeMatch = parts[0].match(/:(.*?);/);
  var mime = mimeMatch ? mimeMatch[1] : 'image/png';
  var bstr = atob(parts[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function hexToRgba(hex, alpha) {
  var h = String(hex || '#ef4444').replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var r = parseInt(h.slice(0, 2), 16) || 239;
  var g = parseInt(h.slice(2, 4), 16) || 68;
  var b = parseInt(h.slice(4, 6), 16) || 68;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

/* NATIVE OPENXML .DOCX GENERATOR VIA JSZIP */
function xmlEscape(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wParagraph(text, bold, alignCenter, sizeHalfPt) {
  var jc = alignCenter ? '<w:jc w:val="center"/>' : '';
  var b = bold ? '<w:b/>' : '';
  var sz = sizeHalfPt || 24;
  return '<w:p><w:pPr>' + jc + '<w:spacing w:after="120"/></w:pPr>' +
    '<w:r><w:rPr>' + b + '<w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/></w:rPr>' +
    '<w:t xml:space="preserve">' + xmlEscape(text) + '</w:t></w:r></w:p>';
}

function wImageRun(rId, imgIndex, cxEmu, cyEmu) {
  return '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="80"/></w:pPr><w:r><w:drawing>' +
    '<wp:inline distT="0" distB="0" distL="0" distR="0">' +
      '<wp:extent cx="' + cxEmu + '" cy="' + cyEmu + '"/>' +
      '<wp:docPr id="' + imgIndex + '" name="Picture ' + imgIndex + '"/>' +
      '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>' +
      '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
        '<pic:pic>' +
          '<pic:nvPicPr><pic:cNvPr id="' + imgIndex + '" name="img' + imgIndex + '.jpg"/><pic:cNvPicPr/></pic:nvPicPr>' +
          '<pic:blipFill><a:blip r:embed="' + rId + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
          '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cxEmu + '" cy="' + cyEmu + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>' +
        '</pic:pic>' +
      '</a:graphicData></a:graphic>' +
    '</wp:inline>' +
  '</w:drawing></w:r></w:p>';
}

function wTableBorders() {
  return '<w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>' +
    '<w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/>' +
    '<w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/>' +
    '<w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>' +
    '<w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/>' +
    '<w:insideH w:val="single" w:sz="6" w:space="0" w:color="000000"/>' +
    '<w:insideV w:val="single" w:sz="6" w:space="0" w:color="000000"/>' +
  '</w:tblBorders></w:tblPr>';
}

async function buildAndDownloadDocx(bodyXml, mediaItems, fileName) {
  var zip = new JSZip();

  zip.file('[Content_Types].xml',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Default Extension="jpg" ContentType="image/jpeg"/>' +
      '<Default Extension="png" ContentType="image/png"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '</Types>'
  );

  zip.folder('_rels').file('.rels',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rIdDoc" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>'
  );

  var relsXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
  var mediaFolder = zip.folder('word').folder('media');

  mediaItems.forEach(function(item) {
    relsXml += '<Relationship Id="' + item.rId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/' + item.fileName + '"/>';
    var b64 = item.dataUrl.split(',')[1];
    if (b64) mediaFolder.file(item.fileName, b64, { base64: true });
  });
  relsXml += '</Relationships>';
  zip.folder('word').folder('_rels').file('document.xml.rels', relsXml);

  var docXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ' +
                'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
                'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ' +
                'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" ' +
                'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
      '<w:body>' +
        bodyXml +
        '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="850" w:bottom="1134" w:left="1417"/></w:sectPr>' +
      '</w:body>' +
    '</w:document>';

  zip.folder('word').file('document.xml', docXml);

  var blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  triggerBlobDownload(blob, fileName);
}

async function exportDocxDefectList(withPhotos) {
  var groupedDefects = getGroupedDefectsForReports();
  var media = [];
  var imgIdx = 1;

  var body = wParagraph('\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 1. \u0412\u0435\u0434\u043E\u043C\u043E\u0441\u0442\u044C \u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432 \u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0439', true, true, 28);

  var defPages = getPagesWithAnyPoints(['D']);
  for (var pIdx = 0; pIdx < defPages.length; pIdx++) {
    var pg = defPages[pIdx];
    var defSchemeUrl = await buildAnnotatedSchemeDataUrl(['D'], pg);
    if (defSchemeUrl && defSchemeUrl.indexOf(',') !== -1) {
      var rIdDef = 'rIdSchemeDef' + imgIdx;
      var defDim = await getDataUrlDimensions(defSchemeUrl);
      var defEmu = calcDocxEmu(defDim.width, defDim.height, 5800000, 4400000);
      media.push({ rId: rIdDef, fileName: 'scheme_def_' + imgIdx + '.png', dataUrl: defSchemeUrl });
      var hdr = '\u0421\u0445\u0435\u043C\u0430 \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432 \u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0439' + (defPages.length > 1 ? (' (' + U.sheetWord + ' ' + pg + ')') : '');
      body += wParagraph(hdr, true, true, 24);
      body += wImageRun(rIdDef, imgIdx, defEmu.cx, defEmu.cy);
      imgIdx++;
    }
  }

  body += '<w:tbl>' + wTableBorders();

  if (withPhotos) {
    body += '<w:tr><w:trPr><w:tblHeader/></w:trPr>' +
      '<w:tc>' + wParagraph('\u041D\u043E\u043C\u0435\u0440 \u0434\u0435\u0444\u0435\u043A\u0442\u0430', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u0430 (\u043E\u0441\u0438)', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u0434\u0435\u0444\u0435\u043A\u0442\u0430', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u0430', true, true, 22) + '</w:tc>' +
    '</w:tr>';

    for (var i = 0; i < groupedDefects.length; i++) {
      var pt = groupedDefects[i];
      var photoCellXml = '';
      if (pt.photos.length > 0) {
        for (var j = 0; j < pt.photos.length; j++) {
          var ph = pt.photos[j];
          var rId = 'rIdImg' + imgIdx;
          var origUrl = await getRotatedPhotoDataUrl(ph);
          var docImg = await compressDataUrlForDocx(origUrl, 1280, 0.82);
          var emu = calcDocxEmu(docImg.width, docImg.height, 2250000, 2250000);
          media.push({ rId: rId, fileName: 'img' + imgIdx + '.jpg', dataUrl: docImg.dataUrl });
          photoCellXml += wImageRun(rId, imgIdx, emu.cx, emu.cy);
          imgIdx++;
        }
      } else {
        photoCellXml = wParagraph('-', false, true, 22);
      }

      var descParts = [pt.description || '', pt.structure ? ('(' + pt.structure + (pt.category ? '; ' + pt.category : '') + ')') : (pt.category || '')].filter(Boolean).join(' ');
      body += '<w:tr>' +
        '<w:tc>' + wParagraph(pt.code || '-', true, true, 22) + '</w:tc>' +
        '<w:tc>' + wParagraph(pt.axes || '-', false, true, 22) + '</w:tc>' +
        '<w:tc>' + photoCellXml + '</w:tc>' +
        '<w:tc>' + wParagraph(descParts || '-', false, false, 22) + '</w:tc>' +
      '</w:tr>';
    }
  } else {
    body += '<w:tr><w:trPr><w:tblHeader/></w:trPr>' +
      '<w:tc>' + wParagraph('\u041D\u043E\u043C\u0435\u0440 \u0434\u0435\u0444\u0435\u043A\u0442\u0430', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u0430 (\u043E\u0441\u0438)', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u0424\u0430\u0439\u043B\u044B \u0444\u043E\u0442\u043E', true, true, 22) + '</w:tc>' +
    '</w:tr>';

    groupedDefects.forEach(function(pt) {
      var files = pt.photos.map(function(p) { return p.fileName; }).join(', ');
      body += '<w:tr>' +
        '<w:tc>' + wParagraph(pt.code || '-', true, true, 22) + '</w:tc>' +
        '<w:tc>' + wParagraph(pt.axes || '-', false, true, 22) + '</w:tc>' +
        '<w:tc>' + wParagraph(pt.description || '', false, false, 22) + '</w:tc>' +
        '<w:tc>' + wParagraph(pt.category || '', false, true, 22) + '</w:tc>' +
        '<w:tc>' + wParagraph(files || '-', false, false, 20) + '</w:tc>' +
      '</w:tr>';
    });
  }

  body += '</w:tbl>';
  body += wParagraph('\u0428\u0438\u0444\u0440: ' + state.project.cipher, true, false, 22);
  await buildAndDownloadDocx(body, media, state.project.cipher + '_Prilozhenie_1_Vedomost_Defektov.docx');
}

function getPagesWithPhotoAlbumPoints(albumMap) {
  var pages = [];
  state.points.forEach(function(p) {
    if (p.deleted) return;
    var pg = p.page || 1;
    if (isPointInPhotoAlbum(p) && (albumMap.byPointId[p.id] || []).length > 0) {
      if (pages.indexOf(pg) === -1) pages.push(pg);
    }
  });
  pages.sort(function(a, b) { return a - b; });
  if (!pages.length) pages.push(state.currentPage || 1);
  return pages;
}

function getPagesWithAnyPoints(allowedTypes) {
  var pages = [];
  state.points.forEach(function(p) {
    if (p.deleted) return;
    if (Array.isArray(allowedTypes) && allowedTypes.indexOf(p.type) === -1) return;
    var pg = p.page || 1;
    if (pages.indexOf(pg) === -1) pages.push(pg);
  });
  pages.sort(function(a, b) { return a - b; });
  if (!pages.length) pages.push(state.currentPage || 1);
  return pages;
}

function buildPhotoLegendBadgeDataUrl() {
  var c = document.createElement('canvas');
  c.width = 72;
  c.height = 72;
  var ctx = c.getContext('2d');
  ctx.beginPath();
  ctx.arc(36, 36, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#18181b';
  ctx.stroke();
  ctx.fillStyle = '#09090b';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('1', 36, 38);
  return c.toDataURL('image/png');
}

function wLegendBadgeParagraph(rId, imgIndex, labelText) {
  var cxEmu = 216000;
  var cyEmu = 216000;
  return '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="40" w:after="160"/></w:pPr>' +
    '<w:r><w:drawing>' +
      '<wp:inline distT="0" distB="0" distL="0" distR="0">' +
        '<wp:extent cx="' + cxEmu + '" cy="' + cyEmu + '"/>' +
        '<wp:docPr id="' + imgIndex + '" name="Legend ' + imgIndex + '"/>' +
        '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>' +
        '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
          '<pic:pic>' +
            '<pic:nvPicPr><pic:cNvPr id="' + imgIndex + '" name="leg' + imgIndex + '.png"/><pic:cNvPicPr/></pic:nvPicPr>' +
            '<pic:blipFill><a:blip r:embed="' + rId + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
            '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cxEmu + '" cy="' + cyEmu + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>' +
          '</pic:pic>' +
        '</a:graphicData></a:graphic>' +
      '</wp:inline>' +
    '</w:drawing></w:r>' +
    '<w:r><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>' +
    '<w:t xml:space="preserve">' + xmlEscape(labelText) + '</w:t></w:r></w:p>';
}

async function exportDocxPhotoAlbum() {
  var media = [];
  var imgIdx = 1;
  var body = wParagraph('\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 3. \u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0444\u043E\u0442\u043E\u0444\u0438\u043A\u0441\u0430\u0446\u0438\u0438', true, true, 28);

  var albumMap = computePhotoAlbumMap();
  var albumPages = getPagesWithPhotoAlbumPoints(albumMap);

  var legendBadgeUrl = buildPhotoLegendBadgeDataUrl();
  var rIdLegend = 'rIdImgLegend';
  media.push({ rId: rIdLegend, fileName: 'legend_badge.png', dataUrl: legendBadgeUrl });

  for (var pIdx = 0; pIdx < albumPages.length; pIdx++) {
    var pg = albumPages[pIdx];
    var schemeUrl = await buildPhotoSchemeDataUrl(pg);
    if (schemeUrl && schemeUrl.indexOf(',') !== -1) {
      var rIdSch = 'rIdImg' + imgIdx;
      var schDim = await getDataUrlDimensions(schemeUrl);
      var schEmu = calcDocxEmu(schDim.width, schDim.height, 5800000, 4400000);
      media.push({ rId: rIdSch, fileName: 'img' + imgIdx + '.png', dataUrl: schemeUrl });
      var schTitle = U.photoSchemeTitle + (albumPages.length > 1 ? (' (' + U.sheetWord + ' ' + pg + ')') : '');
      body += wParagraph(schTitle, true, true, 24);
      body += wImageRun(rIdSch, imgIdx, schEmu.cx, schEmu.cy);
      imgIdx++;
      body += wLegendBadgeParagraph(rIdLegend, imgIdx, ' \u2014 \u043D\u043E\u043C\u0435\u0440 \u0444\u043E\u0442\u043E');
      imgIdx++;
    }
  }

  /* 15 cm = 5400000 EMU (max width), 11 cm = 3960000 EMU (max height) */
  for (var i = 0; i < albumMap.list.length; i++) {
    var item = albumMap.list[i];
    var pt = item.pt;
    var ph = item.ph;
    var rId = 'rIdImg' + imgIdx;
    var origUrl = await getRotatedPhotoDataUrl(ph);
    var docImg = await compressDataUrlForDocx(origUrl, 1600, 0.85);
    var emu = calcDocxEmu(docImg.width, docImg.height, 5400000, 3960000);
    media.push({ rId: rId, fileName: 'img' + imgIdx + '.jpg', dataUrl: docImg.dataUrl });
    body += wImageRun(rId, imgIdx, emu.cx, emu.cy);

    var descText = (pt.description || '').trim();
    var axesPart = pt.axes ? ('(' + pt.axes + ')') : '';
    var tail = [descText, axesPart].filter(Boolean).join(' ');
    var cap = U.figWord + item.fig + '.' + (tail ? (' ' + tail) : '');
    body += wParagraph(cap, true, true, 22);
    imgIdx++;
  }

  await buildAndDownloadDocx(body, media, state.project.cipher + '_Prilozhenie_3_Fotofiksaciya.docx');
}

async function exportDocxStrengthProtocol() {
  var prPoints = state.points.filter(function(p) { return p.type === 'PR'; });
  var inst = state.settings.instruments.find(function(i) { return i.id === (prPoints[0] ? prPoints[0].instrumentId : 'ips_mg403'); }) || state.settings.instruments[0];
  var dateFormatted = state.project.date.split('-').reverse().join('.');
  var summaryClass = (prPoints[0] && prPoints[0].concreteClass) ? prPoints[0].concreteClass : 'B50';
  var media = [];
  var imgIdx = 1;

  var body = wParagraph('\u041E\u041F\u0420\u0415\u0414\u0415\u041B\u0415\u041D\u0418\u0415 \u041F\u0420\u041E\u0427\u041D\u041E\u0421\u0422\u0418 \u041C\u0410\u0422\u0415\u0420\u0418\u0410\u041B\u041E\u0412 \u0421\u0422\u0420\u041E\u0418\u0422\u0415\u041B\u042C\u041D\u042B\u0425 \u041A\u041E\u041D\u0421\u0422\u0420\u0423\u041A\u0426\u0418\u0419', true, true, 26);
  body += wParagraph('\u041F\u0420\u041E\u0422\u041E\u041A\u041E\u041B \u2116 ' + state.project.protocolNum + ' \u043E\u0442 ' + dateFormatted + ' \u0433.', true, true, 26);
  body += wParagraph('\u041E\u0431\u044A\u0435\u043A\u0442: ' + state.project.fullName, false, false, 24);
  body += wParagraph('\u0414\u0430\u0442\u0430 \u0438\u0441\u043F\u044B\u0442\u0430\u043D\u0438\u0439: ' + dateFormatted + ' \u0433.', false, false, 24);
  body += wParagraph('\u041C\u0435\u0442\u043E\u0434\u0438\u043A\u0430 \u0438\u0441\u043F\u044B\u0442\u0430\u043D\u0438\u0439: ' + inst.gost, false, false, 24);
  body += wParagraph('\u0421\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0439: ' + inst.name + ', ' + inst.serial, false, false, 24);

  var prPages = getPagesWithAnyPoints(['PR']);
  for (var pIdx = 0; pIdx < prPages.length; pIdx++) {
    var pg = prPages[pIdx];
    var prSchemeUrl = await buildAnnotatedSchemeDataUrl(['PR'], pg);
    if (prSchemeUrl) {
      var rIdPr = 'rIdSchemePr' + imgIdx;
      var prDim = await getDataUrlDimensions(prSchemeUrl);
      var prEmu = calcDocxEmu(prDim.width, prDim.height, 5800000, 4400000);
      media.push({ rId: rIdPr, fileName: 'scheme_pr_' + imgIdx + '.png', dataUrl: prSchemeUrl });
      var hdr = '\u0421\u0445\u0435\u043C\u0430 \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0443\u0447\u0430\u0441\u0442\u043A\u043E\u0432 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u0438' + (prPages.length > 1 ? (' (' + U.sheetWord + ' ' + pg + ')') : '');
      body += wParagraph(hdr, true, true, 24);
      body += wImageRun(rIdPr, imgIdx, prEmu.cx, prEmu.cy);
      imgIdx++;
    }
  }

  body += '<w:tbl>' + wTableBorders() +
    '<w:tr>' +
      '<w:tc>' + wParagraph('\u041D\u043E\u043C\u0435\u0440 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0432 \u043E\u0441\u044F\u0445', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0431\u0435\u0442\u043E\u043D\u0430, \u041C\u041F\u0430', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph('\u041A\u043B\u0430\u0441\u0441 \u0431\u0435\u0442\u043E\u043D\u0430', true, true, 22) + '</w:tc>' +
    '</w:tr>';

  prPoints.forEach(function(p) {
    body += '<w:tr>' +
      '<w:tc>' + wParagraph(p.code || '-', true, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph(p.structure || '-', false, false, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph(p.axes || '-', false, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph(String(p.mpa || '-'), false, true, 22) + '</w:tc>' +
      '<w:tc>' + wParagraph(String(p.concreteClass || '-'), false, true, 22) + '</w:tc>' +
    '</w:tr>';
  });
  body += '</w:tbl>';

  body += wParagraph('\u0412\u044B\u0432\u043E\u0434 \u043F\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0439: \u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0431\u0435\u0442\u043E\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043A\u043B\u0430\u0441\u0441\u0443 ' + summaryClass + '.', true, false, 24);
  body += wParagraph('\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: _______________________ ' + state.project.director, false, false, 24);

  await buildAndDownloadDocx(body, media, state.project.cipher + '_Prilozhenie_4_Protokol_Prochnosti.docx');
}

/* RENDER ANNOTATED SCHEME TO PNG (LARGE READABLE CIRCLES/OVALS DIRECTLY ON POINTS) */
function buildAnnotatedSchemeDataUrl(allowedTypes, pageNum) {
  return new Promise(function(resolve) {
    var curPage = pageNum || state.currentPage || 1;
    var src = getPageBackgroundDataUrl(curPage);
    var img = new Image();
    img.onload = function() {
      var c = document.createElement('canvas');
      c.width = img.width || 1200;
      c.height = img.height || 840;
      var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, c.width, c.height);

      var sx = c.width / PLAN_W;
      var sy = c.height / PLAN_H;
      var kScale = Math.max(1, Math.max(c.width, c.height) / 1000);

      if (state.showAxesInReport !== false) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(2, Math.round(2.2 * kScale));
        ctx.setLineDash([Math.round(18 * kScale), Math.round(6 * kScale), Math.round(2.5 * kScale), Math.round(6 * kScale)]);
        state.axes.vertical.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisVBounds(ax);
          var px = ax.x * sx;
          ctx.beginPath();
          ctx.moveTo(px, (PLAN_H - b.y2) * sy);
          ctx.lineTo(px, (PLAN_H - b.y1) * sy);
          ctx.stroke();
        });
        state.axes.horizontal.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisHBounds(ax);
          var py = (PLAN_H - ax.y) * sy;
          ctx.beginPath();
          ctx.moveTo(b.x1 * sx, py);
          ctx.lineTo(b.x2 * sx, py);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        var axR = Math.round(18 * kScale);
        var axFont = Math.round(15 * kScale);
        state.axes.vertical.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisVBounds(ax);
          var px = ax.x * sx;
          var py = (PLAN_H - b.badgeY) * sy;
          ctx.beginPath(); ctx.arc(px, py, axR, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff'; ctx.fill();
          ctx.lineWidth = Math.max(2, Math.round(2.5 * kScale)); ctx.strokeStyle = '#000000'; ctx.stroke();
          ctx.fillStyle = '#000000'; ctx.font = 'bold ' + axFont + 'px Arial';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(ax.label, px, py);
        });

        state.axes.horizontal.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisHBounds(ax);
          var px = b.badgeX * sx;
          var py = (PLAN_H - ax.y) * sy;
          ctx.beginPath(); ctx.arc(px, py, axR, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff'; ctx.fill();
          ctx.lineWidth = Math.max(2, Math.round(2.5 * kScale)); ctx.strokeStyle = '#000000'; ctx.stroke();
          ctx.fillStyle = '#000000'; ctx.font = 'bold ' + axFont + 'px Arial';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(ax.label, px, py);
        });
      }

      var visiblePoints = state.points.filter(function(p) {
        if ((p.page || 1) !== curPage) return false;
        if (Array.isArray(allowedTypes) && allowedTypes.indexOf(p.type) === -1) return false;
        return true;
      });

      visiblePoints.forEach(function(pt) {
        if (pt.type === 'D' && pt.areaStyle && pt.areaStyle !== 'point' && Array.isArray(pt.areaCoords) && pt.areaCoords.length >= 3) {
          var aCol = pt.areaColor || '#ef4444';
          ctx.beginPath();
          pt.areaCoords.forEach(function(coord, idx) {
            var vx = coord[1] * sx;
            var vy = (PLAN_H - coord[0]) * sy;
            if (idx === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          });
          ctx.closePath();
          ctx.fillStyle = hexToRgba(aCol, pt.areaStyle === 'fill' ? 0.30 : 0.08);
          ctx.fill();
          ctx.lineWidth = Math.max(2, Math.round(2.4 * kScale));
          ctx.strokeStyle = aCol;
          ctx.stroke();

          if (pt.areaStyle === 'hatch45' || pt.areaStyle === 'cross') {
            var segs1 = getHatchSegmentsForPolygon(pt.areaCoords, 45, 10);
            ctx.beginPath();
            segs1.forEach(function(seg) {
              ctx.moveTo(seg[0][1] * sx, (PLAN_H - seg[0][0]) * sy);
              ctx.lineTo(seg[1][1] * sx, (PLAN_H - seg[1][0]) * sy);
            });
            ctx.lineWidth = Math.max(1.5, Math.round(1.8 * kScale));
            ctx.strokeStyle = aCol;
            ctx.stroke();
          }
          if (pt.areaStyle === 'cross') {
            var segs2 = getHatchSegmentsForPolygon(pt.areaCoords, -45, 10);
            ctx.beginPath();
            segs2.forEach(function(seg) {
              ctx.moveTo(seg[0][1] * sx, (PLAN_H - seg[0][0]) * sy);
              ctx.lineTo(seg[1][1] * sx, (PLAN_H - seg[1][0]) * sy);
            });
            ctx.lineWidth = Math.max(1.5, Math.round(1.8 * kScale));
            ctx.strokeStyle = aCol;
            ctx.stroke();
          }
        }
      });

      var cols = { D: '#ef4444', VS: '#f59e0b', PR: '#0ea5e9', OB: '#22c55e' };
      var ptFont = Math.round(19 * kScale);
      var ry = Math.round(20 * kScale);

      visiblePoints.forEach(function(pt) {
        var px = pt.x * sx;
        var py = (PLAN_H - pt.y) * sy;
        var labelText = String(pt.code || '');
        ctx.font = 'bold ' + ptFont + 'px Arial';
        var tw = ctx.measureText(labelText).width;
        var rx = Math.max(ry, Math.round(tw / 2) + Math.round(11 * kScale));

        if (pt.viewDirection !== undefined && pt.viewDirection !== null && pt.viewDirection !== '') {
          var ang = parseFloat(pt.viewDirection);
          if (!isNaN(ang)) {
            var rad = (ang - 90) * Math.PI / 180;
            var cosA = Math.cos(rad), sinA = Math.sin(rad);
            var rEdge = (rx * ry) / Math.sqrt(Math.pow(ry * cosA, 2) + Math.pow(rx * sinA, 2));
            var arrLen = 24 * kScale;
            var arrHead = 9 * kScale;
            var sX = px + cosA * (rEdge - 2 * kScale);
            var sY = py + sinA * (rEdge - 2 * kScale);
            var eX = px + cosA * (rEdge + arrLen);
            var eY = py + sinA * (rEdge + arrLen);
            var aL = rad - Math.PI * 0.82;
            var aR = rad + Math.PI * 0.82;

            ctx.beginPath();
            ctx.moveTo(sX, sY);
            ctx.lineTo(eX, eY);
            ctx.moveTo(eX + Math.cos(aL) * arrHead, eY + Math.sin(aL) * arrHead);
            ctx.lineTo(eX, eY);
            ctx.lineTo(eX + Math.cos(aR) * arrHead, eY + Math.sin(aR) * arrHead);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = Math.max(4, Math.round(5.5 * kScale));
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            ctx.lineWidth = Math.max(2.5, Math.round(3.2 * kScale));
            ctx.strokeStyle = '#18181b';
            ctx.stroke();
          }
        }

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(px - rx, py - ry, rx * 2, ry * 2, ry);
        } else {
          ctx.arc(px, py, rx, 0, Math.PI * 2);
        }
        ctx.fillStyle = (pt.type === 'D' && pt.areaColor) ? pt.areaColor : (cols[pt.type] || '#3b82f6');
        ctx.fill();
        ctx.lineWidth = Math.max(2.5, Math.round(3 * kScale));
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.fillStyle = (pt.type === 'VS' || pt.type === 'OB') ? '#000000' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, px, py);
      });

      resolve(c.toDataURL('image/png'));
    };
    img.onerror = function() { resolve(null); };
    img.src = src;
  });
}

async function exportAnnotatedSchemePng() {
  var pages = getPagesWithAnyPoints();
  for (var i = 0; i < pages.length; i++) {
    var pg = pages[i];
    var url = await buildAnnotatedSchemeDataUrl(null, pg);
    if (url) {
      triggerBlobDownload(dataUrlToBlob(url), state.project.cipher + '_Prilozhenie_2_Shema_List' + pg + '.png');
    }
  }
}

function buildPhotoSchemeDataUrl(pageNum) {
  return new Promise(function(resolve) {
    var curPage = pageNum || state.currentPage || 1;
    var src = getPageBackgroundDataUrl(curPage);
    var img = new Image();
    img.onload = function() {
      var c = document.createElement('canvas');
      c.width = img.width || 1200;
      c.height = img.height || 840;
      var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, c.width, c.height);

      var sx = c.width / PLAN_W;
      var sy = c.height / PLAN_H;
      var kScale = Math.max(1, Math.max(c.width, c.height) / 1000);

      if (state.showAxesInReport !== false) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(2, Math.round(2.2 * kScale));
        ctx.setLineDash([Math.round(18 * kScale), Math.round(6 * kScale), Math.round(2.5 * kScale), Math.round(6 * kScale)]);
        state.axes.vertical.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisVBounds(ax);
          var px = ax.x * sx;
          ctx.beginPath();
          ctx.moveTo(px, (PLAN_H - b.y2) * sy);
          ctx.lineTo(px, (PLAN_H - b.y1) * sy);
          ctx.stroke();
        });
        state.axes.horizontal.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisHBounds(ax);
          var py = (PLAN_H - ax.y) * sy;
          ctx.beginPath();
          ctx.moveTo(b.x1 * sx, py);
          ctx.lineTo(b.x2 * sx, py);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        var axR = Math.round(18 * kScale);
        var axFont = Math.round(15 * kScale);
        state.axes.vertical.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisVBounds(ax);
          var px = ax.x * sx;
          var py = (PLAN_H - b.badgeY) * sy;
          ctx.beginPath(); ctx.arc(px, py, axR, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff'; ctx.fill();
          ctx.lineWidth = Math.max(2, Math.round(2.5 * kScale)); ctx.strokeStyle = '#000000'; ctx.stroke();
          ctx.fillStyle = '#000000'; ctx.font = 'bold ' + axFont + 'px Arial';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(ax.label, px, py);
        });

        state.axes.horizontal.filter(function(a) { return (a.page || 1) === curPage; }).forEach(function(ax) {
          var b = getAxisHBounds(ax);
          var px = b.badgeX * sx;
          var py = (PLAN_H - ax.y) * sy;
          ctx.beginPath(); ctx.arc(px, py, axR, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff'; ctx.fill();
          ctx.lineWidth = Math.max(2, Math.round(2.5 * kScale)); ctx.strokeStyle = '#000000'; ctx.stroke();
          ctx.fillStyle = '#000000'; ctx.font = 'bold ' + axFont + 'px Arial';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(ax.label, px, py);
        });
      }

      var albumMap = computePhotoAlbumMap();
      var ptsToDraw = state.points.filter(function(p) {
        return (p.page || 1) === curPage && isPointInPhotoAlbum(p) && (albumMap.byPointId[p.id] || []).length > 0;
      });

      var figFont = Math.round(21 * kScale);
      var ry = Math.round(22 * kScale);

      ptsToDraw.forEach(function(pt) {
        var px = pt.x * sx;
        var py = (PLAN_H - pt.y) * sy;
        var nums = albumMap.byPointId[pt.id] || [];
        var labelText = nums.join(', ');

        ctx.font = 'bold ' + figFont + 'px Arial';
        var tw = ctx.measureText(labelText).width;
        var rx = Math.max(ry, Math.round(tw / 2) + Math.round(12 * kScale));

        if (pt.viewDirection !== undefined && pt.viewDirection !== null && pt.viewDirection !== '') {
          var ang = parseFloat(pt.viewDirection);
          if (!isNaN(ang)) {
            var rad = (ang - 90) * Math.PI / 180;
            var cosA = Math.cos(rad), sinA = Math.sin(rad);
            var rEdge = (rx * ry) / Math.sqrt(Math.pow(ry * cosA, 2) + Math.pow(rx * sinA, 2));
            var arrLen = 24 * kScale;
            var arrHead = 9 * kScale;
            var sX = px + cosA * (rEdge - 2 * kScale);
            var sY = py + sinA * (rEdge - 2 * kScale);
            var eX = px + cosA * (rEdge + arrLen);
            var eY = py + sinA * (rEdge + arrLen);
            var aL = rad - Math.PI * 0.82;
            var aR = rad + Math.PI * 0.82;

            ctx.beginPath();
            ctx.moveTo(sX, sY);
            ctx.lineTo(eX, eY);
            ctx.moveTo(eX + Math.cos(aL) * arrHead, eY + Math.sin(aL) * arrHead);
            ctx.lineTo(eX, eY);
            ctx.lineTo(eX + Math.cos(aR) * arrHead, eY + Math.sin(aR) * arrHead);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = Math.max(4, Math.round(5.5 * kScale));
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            ctx.lineWidth = Math.max(2.5, Math.round(3.2 * kScale));
            ctx.strokeStyle = '#18181b';
            ctx.stroke();
          }
        }

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(px - rx, py - ry, rx * 2, ry * 2, ry);
        } else {
          ctx.arc(px, py, rx, 0, Math.PI * 2);
        }
        ctx.fillStyle = '#fef08a';
        ctx.fill();
        ctx.lineWidth = Math.max(2.5, Math.round(3 * kScale));
        ctx.strokeStyle = '#18181b';
        ctx.stroke();

        ctx.fillStyle = '#09090b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, px, py);
      });

      resolve(c.toDataURL('image/png'));
    };
    img.onerror = function() { resolve(null); };
    img.src = src;
  });
}

async function exportPhotoSchemePng() {
  var albumMap = computePhotoAlbumMap();
  var pages = getPagesWithPhotoAlbumPoints(albumMap);
  for (var i = 0; i < pages.length; i++) {
    var pg = pages[i];
    var url = await buildPhotoSchemeDataUrl(pg);
    if (url) {
      triggerBlobDownload(dataUrlToBlob(url), state.project.cipher + '_Prilozhenie_3_Shema_Fotofiksacii_List' + pg + '.png');
    }
  }
}

function buildExcelWorkbook() {
  var wb = XLSX.utils.book_new();
  var customCols = state.settings.customAttributes;

  var allRows = state.points.filter(function(p) { return !p.deleted; }).map(function(pt, i) {
    var r = {
      '\u2116': i + 1,
      '\u0422\u0438\u043F': TYPE_PREFIX[pt.type] || pt.type,
      '\u041A\u043E\u0434': pt.code,
      '\u041B\u0438\u0441\u0442': pt.page || 1,
      '\u041E\u0441\u0438': pt.axes || U.noAxes,
      '\u0423\u0447\u0430\u0441\u0442\u043E\u043A': pt.zone || '',
      '\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F': pt.structure || '',
      '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435': pt.description || '',
      '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F': pt.type === 'D' ? pt.category : '',
      '\u0412\u0441\u043A\u0440\u044B\u0442\u0438\u0435': pt.type === 'VS' ? pt.openingResult : '',
      '\u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C, \u041C\u041F\u0430': pt.type === 'PR' ? pt.mpa : '',
      '\u041A\u043B\u0430\u0441\u0441 \u0431\u0435\u0442\u043E\u043D\u0430': pt.type === 'PR' ? pt.concreteClass : '',
      '\u0424\u0430\u0439\u043B\u044B \u0444\u043E\u0442\u043E': pt.photos.map(function(p) { return 'photos/' + p.fileName; }).join('; ')
    };
    customCols.forEach(function(c) { r[c.name] = (pt.customValues && pt.customValues[c.id]) || ''; });
    return r;
  });
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(allRows.length ? allRows : [{}]), '\u0412\u0441\u0435_\u0442\u043E\u0447\u043A\u0438');
  var defRows = getGroupedDefectsForReports().map(function(p) {
    return {
      '\u041D\u043E\u043C\u0435\u0440 \u0434\u0435\u0444\u0435\u043A\u0442\u0430': p.code,
      '\u041F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u0430 (\u043E\u0441\u0438)': p.axes || '',
      '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432': p.description || '',
      '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F': p.category,
      '\u0424\u043E\u0442\u043E': p.photos.map(function(ph) { return ph.fileName; }).join('; ')
    };
  });
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(defRows.length ? defRows : [{}]), '\u0412\u0435\u0434\u043E\u043C\u043E\u0441\u0442\u044C_\u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432');

  var prRows = state.points.filter(function(p) { return p.type === 'PR'; }).map(function(p) {
    return {
      '\u041D\u043E\u043C\u0435\u0440 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F': p.code,
      '\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438': p.structure || '',
      '\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0432 \u043E\u0441\u044F\u0445': p.axes || '',
      '\u0417\u0430\u043C\u0435\u0440\u044B': p.readings || '',
      '\u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0431\u0435\u0442\u043E\u043D\u0430, \u041C\u041F\u0430': p.mpa,
      '\u041A\u043B\u0430\u0441\u0441 \u0431\u0435\u0442\u043E\u043D\u0430': p.concreteClass
    };
  });
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(prRows.length ? prRows : [{}]), '\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B_\u043F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u0438');

  return wb;
}

function exportExcel() {
  XLSX.writeFile(buildExcelWorkbook(), state.project.cipher + '_Survey_DB.xlsx');
}

async function exportFullZip() {
  var fastMode = confirm(U.confirmFastZip);
  var includeStamped = !fastMode;

  var zip = new JSZip();
  zip.file('project_db.json', JSON.stringify(state, null, 2));
  zip.file('settings_template.json', JSON.stringify(state.settings, null, 2));

  var wb = buildExcelWorkbook();
  var xlsxB64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
  zip.file('reports/' + state.project.cipher + '_Survey_DB.xlsx', xlsxB64, { base64: true });

  var photosFolder = zip.folder('photos');
  var stampedFolder = includeStamped ? zip.folder('photos_with_attributes') : null;

  var totalPh = 0;
  state.points.forEach(function(pt) { totalPh += (pt.photos || []).length; });
  var donePh = 0;

  for (var i = 0; i < state.points.length; i++) {
    var pt = state.points[i];
    var phList = pt.photos || [];
    for (var j = 0; j < phList.length; j++) {
      var ph = phList[j];
      donePh++;
      updateStatusText(U.zipPackProgress + donePh + ' / ' + totalPh);
      var origUrl = await getPhotoOriginalDataUrl(ph);
      if (origUrl && origUrl.indexOf(',') !== -1) {
        var b64 = origUrl.split(',')[1];
        if (b64) photosFolder.file(ph.fileName, b64, { base64: true });
        if (includeStamped && stampedFolder) {
          var stampedUrl = await buildStampedPhotoDataUrl(pt, ph);
          if (stampedUrl && stampedUrl.indexOf(',') !== -1) {
            stampedFolder.file(ph.fileName, stampedUrl.split(',')[1], { base64: true });
          }
        }
      }
    }
  }

  var plansFolder = zip.folder('plans');
  var allPtPages = getPagesWithAnyPoints();
  for (var pIdx = 0; pIdx < allPtPages.length; pIdx++) {
    var pgNum = allPtPages[pIdx];
    var schemeUrl = await buildAnnotatedSchemeDataUrl(null, pgNum);
    if (schemeUrl && schemeUrl.indexOf(',') !== -1) {
      plansFolder.file(state.project.cipher + '_Shema_List' + pgNum + '.png', schemeUrl.split(',')[1], { base64: true });
    }
  }

  var albumMap = computePhotoAlbumMap();
  var albumPages = getPagesWithPhotoAlbumPoints(albumMap);
  for (var aIdx = 0; aIdx < albumPages.length; aIdx++) {
    var aPg = albumPages[aIdx];
    var phSchemeUrl = await buildPhotoSchemeDataUrl(aPg);
    if (phSchemeUrl && phSchemeUrl.indexOf(',') !== -1) {
      plansFolder.file(state.project.cipher + '_Shema_Fotofiksacii_List' + aPg + '.png', phSchemeUrl.split(',')[1], { base64: true });
    }
  }

  var blob = await zip.generateAsync({ type: 'blob' });
  updateStatusText();
  triggerBlobDownload(blob, state.project.cipher + (fastMode ? '_Transfer.zip' : '_Project.zip'));
}

function exportProjectBackup() {
  var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  triggerBlobDownload(blob, state.project.cipher + '_project_db.json');
}

async function clearWholeProjectWithBackup() {
  if (!confirm(U.confirmClearProject)) return;

  var totalPh = 0;
  (state.points || []).forEach(function(pt) { totalPh += (pt.photos || []).length; });

  if (totalPh > 0) {
    await exportFullZip();
  } else if ((state.points || []).length > 0 || state.bgDataUrl) {
    exportProjectBackup();
  }

  await clearAllPhotosInIDB();
  try {
    localStorage.removeItem('stroyrek_isaak_state_v2');
    localStorage.removeItem('stroyrek_isaak_bg_v2');
  } catch (e) {}

  state.mode = 'view';
  state.editMode = false;
  state.selectedPtId = null;
  state.currentPage = 1;
  state.pageCount = 1;
  state.planPages = [];
  state.axes = { vertical: [], horizontal: [] };
  state.points = [];
  state.bgDataUrl = null;
  state.project.date = new Date().toISOString().slice(0, 10);

  updatePageControls();
  setMapBackground(createDefaultSvgPlan());
  renderAxesAndMarkers();
  saveState();
  updateStatusText();
  alert(U.projectClearedMsg);
}

async function importProjectBackup(e) {
  var f = e.target.files[0];
  if (!f) return;
  e.target.value = '';

  var isZip = f.name.toLowerCase().endsWith('.zip') || f.type.indexOf('zip') !== -1;

  if (isZip) {
    try {
      updateStatusText(U.zipUnpackProgress + '...');
      var zip = await JSZip.loadAsync(f);
      var dbEntry = zip.file('project_db.json');
      if (!dbEntry) {
        var foundFiles = zip.file(/project_db\.json$/i);
        if (foundFiles && foundFiles.length) dbEntry = foundFiles[0];
      }
      if (!dbEntry) {
        alert('project_db.json not found in ZIP');
        updateStatusText();
        return;
      }

      var jsonStr = await dbEntry.async('string');
      var loadedState = JSON.parse(jsonStr);

      await clearAllPhotosInIDB();
      state = loadedState;
      state.mode = 'view';
      state.editMode = false;
      ensurePlanPagesConsistency();

      var allZipEntries = {};
      zip.forEach(function(relPath, entry) {
        if (!entry.dir) {
          var baseName = relPath.split('/').pop();
          if (relPath.indexOf('photos/') === 0 || !allZipEntries[baseName]) {
            allZipEntries[baseName] = entry;
          }
        }
      });

      var totalPh = 0;
      (state.points || []).forEach(function(pt) { totalPh += (pt.photos || []).length; });
      var restoredPh = 0;

      for (var i = 0; i < (state.points || []).length; i++) {
        var pt = state.points[i];
        var phList = pt.photos || [];
        for (var j = 0; j < phList.length; j++) {
          var ph = phList[j];
          restoredPh++;
          updateStatusText(U.zipUnpackProgress + restoredPh + ' / ' + totalPh);

          var zipEntry = zip.file('photos/' + ph.fileName) || allZipEntries[ph.fileName];
          if (zipEntry) {
            var uint8 = await zipEntry.async('uint8array');
            var blobObj = new Blob([uint8], { type: 'image/jpeg' });
            await savePhotoOriginalToIDB(ph.id, blobObj);
            if (!ph.thumbUrl) {
              var fullUrl = await blobToDataUrl(blobObj);
              ph.thumbUrl = await buildPhotoThumbDataUrl(fullUrl, 320, 0.72);
            }
            delete ph.dataUrl;
          }
        }
      }

      syncProjectUI();
      populateSelectors();
      applyDarkPlanUI();
      updatePageControls();
      setMapBackground(getPageBackgroundDataUrl(state.currentPage));
      renderAxesAndMarkers();
      saveState();
      updateStatusText();
      alert(U.zipLoadedOk + restoredPh);
    } catch (err) {
      updateStatusText();
      alert('ZIP Error: ' + err.message);
    }
  } else {
    var r = new FileReader();
    r.onload = async function(ev) {
      try {
        var loadedState = JSON.parse(ev.target.result);
        await clearAllPhotosInIDB();
        state = loadedState;
        state.mode = 'view';
        state.editMode = false;
        ensurePlanPagesConsistency();
        syncProjectUI();
        populateSelectors();
        applyDarkPlanUI();
        updatePageControls();
        setMapBackground(getPageBackgroundDataUrl(state.currentPage));
        renderAxesAndMarkers();
        saveState();
        updateStatusText();
      } catch (err) {
        alert('JSON Error');
      }
    };
    r.readAsText(f);
  }
}

/* DROPBOX CLOUD SYNC MODULE (OAUTH2 PKCE + INCREMENTAL PHOTO & EXCEL SYNC) */
const DBX_STORAGE_KEY = 'stroyrek_dropbox_auth_v1';

function getDropboxAuthConfig() {
  try {
    var raw = localStorage.getItem(DBX_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { appKey: '', accessToken: '', refreshToken: '', expiresAt: 0 };
}

function setDropboxAuthConfig(cfg) {
  try {
    localStorage.setItem(DBX_STORAGE_KEY, JSON.stringify(cfg));
  } catch (e) {}
}

function saveDropboxAppKey(val) {
  var cfg = getDropboxAuthConfig();
  cfg.appKey = String(val || '').trim();
  setDropboxAuthConfig(cfg);
}

function getCleanRedirectUri() {
  var path = window.location.pathname.replace(/\/index\.html$/i, '/');
  return window.location.origin + path;
}

function copyDropboxAuthBundle() {
  var cfg = getDropboxAuthConfig();
  if (!cfg.refreshToken && !cfg.accessToken) {
    alert(U.dbxNotConnected);
    return;
  }
  var tokenStr = btoa(unescape(encodeURIComponent(JSON.stringify(cfg))));
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(tokenStr).then(function() {
      alert(U.dbxBundleCopied);
    }).catch(function() {
      prompt(U.dbxBundlePromptCopy, tokenStr);
    });
  } else {
    prompt(U.dbxBundlePromptCopy, tokenStr);
  }
}

function pasteDropboxAuthBundle() {
  var raw = prompt(U.dbxBundlePromptPaste, '');
  if (!raw) return;
  try {
    var decoded = decodeURIComponent(escape(atob(raw.trim())));
    var parsed = JSON.parse(decoded);
    if (parsed && (parsed.refreshToken || parsed.accessToken)) {
      setDropboxAuthConfig(parsed);
      updateDropboxUI();
      listDropboxProjects();
      alert(U.dbxAuthSuccess);
    } else {
      alert('Invalid code');
    }
  } catch (e) {
    alert('Invalid code');
  }
}

let dbxSyncInProgress = false;
let dbxAbortController = null;

function setDropboxProgressUI(visible, text, pct, statusState) {
  var box = document.getElementById('dbxProgressBox');
  var txtEl = document.getElementById('dbxProgressText');
  var pctEl = document.getElementById('dbxProgressPct');
  var fillEl = document.getElementById('dbxProgressBarFill');
  var btnUp = document.getElementById('btnDbxUpload');
  var btnDown = document.getElementById('btnDbxDownload');

  if (btnUp) btnUp.disabled = dbxSyncInProgress;
  if (btnDown) btnDown.disabled = dbxSyncInProgress;

  if (!box) return;
  if (!visible) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'flex';
  var p = Math.max(0, Math.min(100, Math.round(pct || 0)));
  if (txtEl) txtEl.textContent = text || '';
  if (pctEl) pctEl.textContent = p + '%';
  if (fillEl) fillEl.style.width = p + '%';

  if (statusState === 'done') {
    box.style.background = '#064e3b';
    box.style.borderColor = '#10b981';
    if (txtEl) txtEl.style.color = '#ecfdf5';
    if (pctEl) pctEl.style.color = '#6ee7b7';
    if (fillEl) fillEl.style.background = '#10b981';
  } else if (statusState === 'error' || statusState === 'aborted') {
    box.style.background = '#4c1d24';
    box.style.borderColor = '#f43f5e';
    if (txtEl) txtEl.style.color = '#ffe4e6';
    if (pctEl) pctEl.style.color = '#fda4af';
    if (fillEl) fillEl.style.background = '#e11d48';
  } else {
    box.style.background = '#0f172a';
    box.style.borderColor = '#0284c7';
    if (txtEl) txtEl.style.color = '#e2e8f0';
    if (pctEl) pctEl.style.color = '#38bdf8';
    if (fillEl) fillEl.style.background = 'linear-gradient(90deg, #0284c7, #14b8a6)';
  }
}

function requestCloseDropboxModal() {
  if (dbxSyncInProgress) {
    var confirmStop = confirm('\u0412\u044B\u0433\u0440\u0443\u0437\u043A\u0430/\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 Dropbox \u0435\u0449\u0435 \u043D\u0435 \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430.\n\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044E \u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u043E\u043A\u043D\u043E?');
    if (!confirmStop) return;
    if (dbxAbortController) {
      try { dbxAbortController.abort(); } catch (e) {}
    }
    dbxSyncInProgress = false;
    setDropboxProgressUI(true, '\u26D4 \u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C', 0, 'aborted');
    updateStatusText();
  }
  document.getElementById('dropboxModal').classList.remove('active');
}

function openDropboxModal() {
  updateDropboxUI();
  if (!dbxSyncInProgress) {
    setDropboxProgressUI(false);
  }
  document.getElementById('dropboxModal').classList.add('active');
  var cfg = getDropboxAuthConfig();
  if (cfg.refreshToken || cfg.accessToken) {
    listDropboxProjects();
  }
}

function updateDropboxUI() {
  var cfg = getDropboxAuthConfig();
  var inp = document.getElementById('dbxAppKeyInput');
  if (inp && cfg.appKey) inp.value = cfg.appKey;
  var hint = document.getElementById('dbxRedirectUriHint');
  if (hint) hint.textContent = getCleanRedirectUri();
  var lbl = document.getElementById('dbxCurProjectLabel');
  if (lbl) lbl.textContent = state.project.cipher + ' (' + (state.project.shortName || '') + ')';

  var connected = !!(cfg.refreshToken || cfg.accessToken);
  var badge = document.getElementById('dbxStatusBadge');
  var btnOut = document.getElementById('btnDbxLogout');
  var topBtn = document.getElementById('btnCloudSync');

  if (badge) {
    badge.textContent = connected ? U.dbxConnected : U.dbxNotConnected;
    badge.style.color = connected ? '#4ade80' : '#a1a1aa';
  }
  if (btnOut) btnOut.style.display = connected ? 'inline-block' : 'none';
  if (topBtn) topBtn.style.background = connected ? '#0f766e' : '#0369a1';
}

function dropboxLogout() {
  var cfg = getDropboxAuthConfig();
  cfg.accessToken = '';
  cfg.refreshToken = '';
  cfg.expiresAt = 0;
  setDropboxAuthConfig(cfg);
  updateDropboxUI();
}

function base64UrlEncodeBytes(bytes) {
  var str = '';
  for (var i = 0; i < bytes.length; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function startDropboxOAuth() {
  var cfg = getDropboxAuthConfig();
  var appKey = (document.getElementById('dbxAppKeyInput').value || cfg.appKey || '').trim();
  if (!appKey) {
    alert(U.dbxEnterAppKey);
    return;
  }
  cfg.appKey = appKey;
  setDropboxAuthConfig(cfg);

  var rand = new Uint8Array(32);
  window.crypto.getRandomValues(rand);
  var verifier = base64UrlEncodeBytes(rand);
  localStorage.setItem('stroyrek_dbx_pkce_verifier', verifier);

  var enc = new TextEncoder().encode(verifier);
  var digest = await window.crypto.subtle.digest('SHA-256', enc);
  var challenge = base64UrlEncodeBytes(new Uint8Array(digest));

  var redirectUri = getCleanRedirectUri();
  var authUrl = 'https://www.dropbox.com/oauth2/authorize' +
    '?client_id=' + encodeURIComponent(appKey) +
    '&response_type=code' +
    '&code_challenge=' + encodeURIComponent(challenge) +
    '&code_challenge_method=S256' +
    '&token_access_type=offline' +
    '&redirect_uri=' + encodeURIComponent(redirectUri);

  window.location.href = authUrl;
}

async function checkDropboxOAuthRedirect() {
  var params = new URLSearchParams(window.location.search);
  var code = params.get('code');
  if (!code) return;

  var verifier = localStorage.getItem('stroyrek_dbx_pkce_verifier');
  var cfg = getDropboxAuthConfig();
  if (!verifier || !cfg.appKey) return;

  try {
    var body = new URLSearchParams();
    body.set('code', code);
    body.set('grant_type', 'authorization_code');
    body.set('client_id', cfg.appKey);
    body.set('code_verifier', verifier);
    body.set('redirect_uri', getCleanRedirectUri());

    var res = await fetch('https://api.dropboxapi.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });
    var data = await res.json();
    if (data.access_token) {
      cfg.accessToken = data.access_token;
      if (data.refresh_token) cfg.refreshToken = data.refresh_token;
      cfg.expiresAt = Date.now() + ((data.expires_in || 14000) - 300) * 1000;
      setDropboxAuthConfig(cfg);
      localStorage.removeItem('stroyrek_dbx_pkce_verifier');
      window.history.replaceState({}, document.title, getCleanRedirectUri());
      alert(U.dbxAuthSuccess);
    } else {
      alert('Dropbox OAuth Error: ' + (data.error_description || data.error || 'Unknown'));
    }
  } catch (err) {
    alert('Dropbox OAuth Error: ' + err.message);
  }
}

async function getValidDropboxToken() {
  var cfg = getDropboxAuthConfig();
  if (cfg.accessToken && cfg.expiresAt > Date.now()) {
    return cfg.accessToken;
  }
  if (!cfg.refreshToken || !cfg.appKey) {
    throw new Error(U.dbxNotConnected);
  }
  var body = new URLSearchParams();
  body.set('grant_type', 'refresh_token');
  body.set('refresh_token', cfg.refreshToken);
  body.set('client_id', cfg.appKey);

  var res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: dbxAbortController ? dbxAbortController.signal : undefined
  });
  var data = await res.json();
  if (!data.access_token) {
    throw new Error(data.error_description || 'Token refresh failed');
  }
  cfg.accessToken = data.access_token;
  cfg.expiresAt = Date.now() + ((data.expires_in || 14000) - 300) * 1000;
  setDropboxAuthConfig(cfg);
  return cfg.accessToken;
}

function dbxHeaderSafeJson(obj) {
  return JSON.stringify(obj).replace(/[\u007f-\uffff]/g, function(c) {
    return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

async function dbxUploadFile(dbxPath, blobOrBytes) {
  var token = await getValidDropboxToken();
  var res = await fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Dropbox-API-Arg': dbxHeaderSafeJson({
        path: dbxPath,
        mode: 'overwrite',
        autorename: false,
        mute: true
      }),
      'Content-Type': 'application/octet-stream'
    },
    body: blobOrBytes,
    signal: dbxAbortController ? dbxAbortController.signal : undefined
  });
  if (!res.ok) {
    var errTxt = await res.text();
    throw new Error('Upload failed (' + dbxPath + '): ' + errTxt);
  }
  return await res.json();
}

async function dbxDownloadFileBlob(dbxPath) {
  var token = await getValidDropboxToken();
  var res = await fetch('https://content.dropboxapi.com/2/files/download', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Dropbox-API-Arg': dbxHeaderSafeJson({ path: dbxPath })
    },
    signal: dbxAbortController ? dbxAbortController.signal : undefined
  });
  if (!res.ok) {
    var errTxt = await res.text();
    throw new Error('Download failed (' + dbxPath + '): ' + errTxt);
  }
  return await res.blob();
}

async function dbxListFolderEntries(folderPath) {
  var token = await getValidDropboxToken();
  var entries = [];
  var res = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path: folderPath, recursive: false }),
    signal: dbxAbortController ? dbxAbortController.signal : undefined
  });
  if (res.status === 409) {
    return [];
  }
  if (!res.ok) {
    var errTxt = await res.text();
    throw new Error(errTxt);
  }
  var data = await res.json();
  entries = entries.concat(data.entries || []);
  while (data.has_more) {
    var resMore = await fetch('https://api.dropboxapi.com/2/files/list_folder/continue', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cursor: data.cursor }),
      signal: dbxAbortController ? dbxAbortController.signal : undefined
    });
    if (!resMore.ok) break;
    data = await resMore.json();
    entries = entries.concat(data.entries || []);
  }
  return entries;
}

function getDropboxProjectFolderName(cipherStr, shortStr) {
  var c = String(cipherStr !== undefined ? cipherStr : (state.project.cipher || 'Project')).replace(/[\\/:*?"<>|]/g, '_').trim();
  var s = String(shortStr !== undefined ? shortStr : (state.project.shortName || '')).replace(/[\\/:*?"<>|]/g, '_').trim();
  var combined = [c, s].filter(Boolean).join('_');
  return '/' + (combined || 'Project');
}

function mergePhotosList(listA, listB) {
  var mapById = {};
  (listA || []).forEach(function(ph) { mapById[ph.id] = ph; });
  (listB || []).forEach(function(ph) {
    if (!mapById[ph.id]) {
      mapById[ph.id] = ph;
    } else {
      mapById[ph.id] = Object.assign({}, mapById[ph.id], ph);
    }
  });
  return Object.keys(mapById).map(function(k) { return mapById[k]; });
}

function mergePointObjects(ptA, ptB) {
  var tsA = Number(ptA.updatedAt || 0);
  var tsB = Number(ptB.updatedAt || 0);
  var base = (tsB > tsA) ? Object.assign({}, ptA, ptB) : Object.assign({}, ptB, ptA);
  base.photos = mergePhotosList(ptA.photos, ptB.photos);
  base.deleted = (tsB > tsA) ? !!ptB.deleted : !!ptA.deleted;
  base.updatedAt = Math.max(tsA, tsB);
  return base;
}

function mergeAxesList(listA, listB) {
  var mapById = {};
  (listA || []).forEach(function(a) { mapById[a.id] = a; });
  (listB || []).forEach(function(b) {
    if (!mapById[b.id]) {
      mapById[b.id] = b;
    } else {
      var a = mapById[b.id];
      var tsA = Number(a.updatedAt || 0);
      var tsB = Number(b.updatedAt || 0);
      var winner = (tsB > tsA) ? Object.assign({}, a, b) : Object.assign({}, b, a);
      winner.deleted = (tsB > tsA) ? !!b.deleted : !!a.deleted;
      winner.updatedAt = Math.max(tsA, tsB);
      mapById[b.id] = winner;
    }
  });
  return Object.keys(mapById).map(function(k) { return mapById[k]; });
}

function mergeProjectStates(local, cloud) {
  if (!cloud || !cloud.project) return local;
  var merged = JSON.parse(JSON.stringify(local));

  var pointsMap = {};
  (cloud.points || []).forEach(function(cp) { pointsMap[cp.id] = cp; });
  (local.points || []).forEach(function(lp) {
    if (pointsMap[lp.id]) {
      pointsMap[lp.id] = mergePointObjects(lp, pointsMap[lp.id]);
    } else {
      pointsMap[lp.id] = lp;
    }
  });
  merged.points = Object.keys(pointsMap).map(function(k) { return pointsMap[k]; });

  if (!merged.axes) merged.axes = { vertical: [], horizontal: [] };
  var cAxes = cloud.axes || { vertical: [], horizontal: [] };
  merged.axes.vertical = mergeAxesList(merged.axes.vertical, cAxes.vertical);
  merged.axes.horizontal = mergeAxesList(merged.axes.horizontal, cAxes.horizontal);

  if (!Array.isArray(merged.planPages) || !merged.planPages.length) {
    if (Array.isArray(cloud.planPages) && cloud.planPages.length) {
      merged.planPages = cloud.planPages.slice();
      merged.bgDataUrl = cloud.bgDataUrl || cloud.planPages[0];
      merged.pageCount = cloud.pageCount || cloud.planPages.length;
    }
  }

  var cStructs = (cloud.settings && cloud.settings.structures) || [];
  var lStructs = (merged.settings && merged.settings.structures) || [];
  cStructs.forEach(function(s) {
    if (lStructs.indexOf(s) === -1) lStructs.push(s);
  });
  merged.settings.structures = lStructs;

  return merged;
}

async function syncUploadToDropbox() {
  if (dbxSyncInProgress) return;
  dbxSyncInProgress = true;
  dbxAbortController = typeof AbortController !== 'undefined' ? new AbortController() : null;

  try {
    setDropboxProgressUI(true, U.dbxUploadStart, 5, 'active');
    updateStatusText(U.dbxUploadStart);
    var baseFolder = getDropboxProjectFolderName(state.project.cipher);
    var photosFolder = baseFolder + '/photos';

    try {
      var cloudDbBlob = await dbxDownloadFileBlob(baseFolder + '/project_db.json');
      var cloudJson = await cloudDbBlob.text();
      var cloudState = JSON.parse(cloudJson);
      state = mergeProjectStates(state, cloudState);
      saveState();
      renderAxesAndMarkers();
    } catch (noCloudErr) {}

    var existingEntries = await dbxListFolderEntries(photosFolder);
    var existingMap = {};
    existingEntries.forEach(function(e) {
      if (e['.tag'] === 'file') existingMap[e.name] = true;
    });

    var missingPhotos = [];
    (state.points || []).forEach(function(pt) {
      if (pt.deleted) return;
      (pt.photos || []).forEach(function(ph) {
        if (ph.fileName && !existingMap[ph.fileName]) {
          missingPhotos.push(ph);
        }
      });
    });

    for (var i = 0; i < missingPhotos.length; i++) {
      if (!dbxSyncInProgress) throw new Error('AbortError');
      var ph = missingPhotos[i];
      var pct = 10 + Math.round(((i + 1) / Math.max(1, missingPhotos.length)) * 70);
      var msg = U.dbxUploadPhotoProgress + (i + 1) + ' / ' + missingPhotos.length + ' (' + ph.fileName + ')';
      setDropboxProgressUI(true, msg, pct, 'active');
      updateStatusText(msg);
      var blobObj = await getPhotoOriginalBlobFromIDB(ph);
      if (blobObj) {
        await dbxUploadFile(photosFolder + '/' + ph.fileName, blobObj);
      }
    }

    if (!dbxSyncInProgress) throw new Error('AbortError');
    setDropboxProgressUI(true, '\u2601\uFE0F\u2B06\uFE0F \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0431\u0430\u0437\u044B project_db.json...', 88, 'active');
    var stateBlob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    await dbxUploadFile(baseFolder + '/project_db.json', stateBlob);

    if (!dbxSyncInProgress) throw new Error('AbortError');
    setDropboxProgressUI(true, '\u2601\uFE0F\u2B06\uFE0F \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0442\u0430\u0431\u043B\u0438\u0446\u044B Excel (.xlsx)...', 95, 'active');
    var wb = buildExcelWorkbook();
    var xlsxBuf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    var xlsxBlob = new Blob([xlsxBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    await dbxUploadFile(baseFolder + '/' + state.project.cipher + '_Survey_DB.xlsx', xlsxBlob);

    dbxSyncInProgress = false;
    setDropboxProgressUI(true, U.dbxUploadDone + missingPhotos.length, 100, 'done');
    updateStatusText();
    listDropboxProjects();
  } catch (err) {
    var wasAborted = !dbxSyncInProgress || (err && (err.name === 'AbortError' || err.message === 'AbortError'));
    dbxSyncInProgress = false;
    updateStatusText();
    if (wasAborted) {
      setDropboxProgressUI(true, '\u26D4 \u0412\u044B\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C', 0, 'aborted');
    } else {
      setDropboxProgressUI(true, '\u274C ' + err.message, 100, 'error');
      alert('Dropbox Error: ' + err.message);
    }
  }
}

async function syncDownloadFromDropbox(customFolderPath) {
  if (dbxSyncInProgress) return;
  dbxSyncInProgress = true;
  dbxAbortController = typeof AbortController !== 'undefined' ? new AbortController() : null;

  try {
    var baseFolder = customFolderPath || getDropboxProjectFolderName(state.project.cipher);
    setDropboxProgressUI(true, U.dbxDownloadStart + ' (' + baseFolder + ')', 10, 'active');
    updateStatusText(U.dbxDownloadStart);

    var dbBlob = await dbxDownloadFileBlob(baseFolder + '/project_db.json');
    var jsonStr = await dbBlob.text();
    var loadedState = JSON.parse(jsonStr);

    var isSameProject = (loadedState.project && loadedState.project.cipher === state.project.cipher);
    if (!isSameProject) {
      await clearAllPhotosInIDB();
      state = loadedState;
    } else {
      state = mergeProjectStates(state, loadedState);
    }

    state.mode = 'view';
    state.editMode = false;
    ensurePlanPagesConsistency();

    var allPhotos = [];
    (state.points || []).forEach(function(pt) {
      if (pt.deleted) return;
      (pt.photos || []).forEach(function(ph) {
        allPhotos.push(ph);
      });
    });

    var downloadedCount = 0;
    for (var i = 0; i < allPhotos.length; i++) {
      if (!dbxSyncInProgress) throw new Error('AbortError');
      var ph = allPhotos[i];
      var pct = 15 + Math.round(((i + 1) / Math.max(1, allPhotos.length)) * 80);
      var existsLocally = await hasPhotoOriginalInIDB(ph.id);
      if (!existsLocally && ph.fileName) {
        downloadedCount++;
        var msg = U.dbxDownloadPhotoProgress + downloadedCount + ' (' + (i + 1) + '/' + allPhotos.length + '): ' + ph.fileName;
        setDropboxProgressUI(true, msg, pct, 'active');
        updateStatusText(msg);
        try {
          var phBlob = await dbxDownloadFileBlob(baseFolder + '/photos/' + ph.fileName);
          await savePhotoOriginalToIDB(ph.id, phBlob);
          if (!ph.thumbUrl) {
            var fullUrl = await blobToDataUrl(phBlob);
            ph.thumbUrl = await buildPhotoThumbDataUrl(fullUrl, 320, 0.72);
          }
        } catch (phErr) {
          if (phErr && (phErr.name === 'AbortError' || phErr.message === 'AbortError')) throw phErr;
        }
      } else {
        setDropboxProgressUI(true, '\u2601\uFE0F\u2B07\uFE0F \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0444\u043E\u0442\u043E (' + (i + 1) + '/' + allPhotos.length + ')', pct, 'active');
      }
    }

    syncProjectUI();
    populateSelectors();
    applyDarkPlanUI();
    updatePageControls();
    setMapBackground(getPageBackgroundDataUrl(state.currentPage));
    renderAxesAndMarkers();
    saveState();

    dbxSyncInProgress = false;
    updateDropboxUI();
    setDropboxProgressUI(true, U.dbxDownloadDone + downloadedCount, 100, 'done');
    updateStatusText();
  } catch (err) {
    var wasAborted = !dbxSyncInProgress || (err && (err.name === 'AbortError' || err.message === 'AbortError'));
    dbxSyncInProgress = false;
    updateStatusText();
    if (wasAborted) {
      setDropboxProgressUI(true, '\u26D4 \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C', 0, 'aborted');
    } else {
      setDropboxProgressUI(true, '\u274C ' + err.message, 100, 'error');
      alert('Dropbox Error: ' + err.message);
    }
  }
}

async function listDropboxProjects() {
  var box = document.getElementById('dbxProjectsListBox');
  if (!box) return;
  try {
    var entries = await dbxListFolderEntries('');
    var folders = entries.filter(function(e) { return e['.tag'] === 'folder'; });
    if (!folders.length) {
      box.innerHTML = '<div style="font-size:11px; color:var(--text-muted);">' + U.dbxNoProjects + '</div>';
      return;
    }
    box.innerHTML = folders.map(function(f) {
      var safePath = String(f.path_display || ('/' + f.name)).replace(/'/g, "\\'");
      return '<div style="display:flex; justify-content:space-between; align-items:center; background:#18181b; padding:6px 8px; border-radius:6px; font-size:12px;">' +
        '<span><b>\uD83D\uDCC1 ' + f.name + '</b></span>' +
        '<button type="button" onclick="if(confirm(U.dbxConfirmLoadFolder + \'' + f.name.replace(/'/g, "\\'") + '?\')) syncDownloadFromDropbox(\'' + safePath + '\')" style="background:#2563eb; color:#fff; border:none; border-radius:5px; padding:4px 8px; font-size:11px; font-weight:700; cursor:pointer;">' + U.dbxLoadBtn + '</button>' +
      '</div>';
    }).join('');
  } catch (err) {
    box.innerHTML = '<div style="font-size:11px; color:#f87171;">' + err.message + '</div>';
  }
}
