const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.querySelector('label').style.color = '#5ec3ff';
    this.parentElement.querySelector('.underline').style.width = '100%';
  });

  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.querySelector('label').style.color = '#6c7293';
      this.parentElement.querySelector('.underline').style.width = '0%';
    }
  });
  });

  // 表单提交验证
  document.querySelector('.login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  if (!username || !password) {
    alert('\u2604\uFE0F 星域密码和ID不能为空！');
    return;
  }

  // 模拟登录成功效果
  document.querySelector('.pulsar-btn').classList.add('success');
  setTimeout(() => {
    alert('\uD83C\uDF0C 登录成功！即将进入控制舱');
    window.location.href = '#';
  }, 1000);
  });



  // 星空背景增强
  function createStars() {
  const container = document.querySelector('.star-background');
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255,255,255,${Math.random()*0.8});
      left: ${Math.random()*100}%;
      top: ${Math.random()*100}%;
      animation: twinkle ${3 + Math.random()*5}s infinite;
    `;
    container.appendChild(star);
  }
  }
  window.onload = createStars;



// 注册表单处理
const registerForm = document.getElementById('registerForm');
if(registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = e.target.querySelectorAll('input');
    const username = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;

    if(password !== confirmPassword) {
      alert('\uD83D\uDE80 密码星轨未对齐，请确认输入一致');
      return;
    }

    const accounts = JSON.parse(localStorage.getItem('spaceAccounts') || '[]');
    if(accounts.some(acc => acc.username === username)) {
      alert('\uD83D\uDD12 该星际ID已被注册');
      return;
    }

    accounts.push({ username, email, password });
    localStorage.setItem('spaceAccounts', JSON.stringify(accounts));
    alert('\uD83C\uDF0C 注册成功！即将跃迁至登录界面');
    window.location.href = 'index.html';
  });
}

// 密码重置处理
const resetForm = document.getElementById('resetForm');
if(resetForm) {
  resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = e.target.querySelectorAll('input');
    const email = inputs[0].value.trim();
    const newPassword = inputs[1].value;
    const confirmPassword = inputs[2].value;

    if(newPassword !== confirmPassword) {
      alert('\uD83D\uDE80 新密码星轨未对齐');
      return;
    }

    const accounts = JSON.parse(localStorage.getItem('spaceAccounts') || '[]');
    const account = accounts.find(acc => acc.email === email);
    
    if(!account) {
      alert('\uD83D\uDD12 未找到该超空间邮箱');
      return;
    }

    account.password = newPassword;
    localStorage.setItem('spaceAccounts', JSON.stringify(accounts));
    alert('\uD83D\uDD13 密码重置成功！请重新登录');
    window.location.href = 'index.html';
  });
}

// 实时密码匹配验证
function checkPasswordMatch(input) {
  const confirmInput = input.closest('.input-group').nextElementSibling?.querySelector('input');
  if(confirmInput && input.value !== confirmInput.value) {
    confirmInput.parentElement.querySelector('.underline').style.background = '#ff4757';
  } else {
    confirmInput.parentElement.querySelector('.underline').style.background = '#5ec3ff';
  }
}

// 邮箱格式验证
function validateEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(input.value)) {
    input.parentElement.querySelector('.underline').style.background = '#ff4757';
  } else {
    input.parentElement.querySelector('.underline').style.background = '#5ec3ff';
  }
}

// 为所有密码和邮箱输入框添加实时验证
document.querySelectorAll('input[type="password"]').forEach(input => {
  input.addEventListener('input', () => checkPasswordMatch(input));
});

document.querySelectorAll('input[type="email"]').forEach(input => {
  input.addEventListener('input', () => validateEmail(input));
});