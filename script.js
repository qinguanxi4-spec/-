const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');
const smallArchBtn = document.getElementById('smallArchBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const smallArchModal = document.getElementById('smallArchModal');
const modeButtons = document.querySelectorAll('.mode-btn');

const forcePathDown = document.getElementById('forcePathDown');
const forcePathLeft = document.getElementById('forcePathLeft');
const forcePathRight = document.getElementById('forcePathRight');
const beamLoadArrow = document.getElementById('beamLoadArrow');
const leftAbutment = document.getElementById('leftAbutment');
const rightAbutment = document.getElementById('rightAbutment');
const modeHint = document.getElementById('modeHint');
const mainArch = document.getElementById('mainArch');
const smallArchLeft = document.getElementById('smallArchLeft');
const smallArchRight = document.getElementById('smallArchRight');
const beamBody = document.getElementById('beamBody');
const beamDeflect = document.getElementById('beamDeflect');
const smallArchLabelL = document.getElementById('smallArchLabelL');
const smallArchLabelR = document.getElementById('smallArchLabelR');

const explanationTitle = document.getElementById('explanationTitle');
const explanationText = document.getElementById('explanationText');

let currentMode = 'arch';
let animationTimers = [];

const explanations = {
  mainArch: {
    title: '什么是主拱？',
    text: '主拱是拱桥最核心的受力骨架。桥面荷载会先传到主拱，再沿弧线方向传向两端桥台。'
  },
  forceArch: {
    title: '力是如何传到桥台的？',
    text: '荷载先向下作用到拱圈，再沿主拱两侧分流，最后把压力传给左右桥台，形成稳定的受压路径。'
  },
  forceBeam: {
    title: '平梁为什么更容易下挠？',
    text: '平梁在中部受压后容易产生弯矩，力主要集中在跨中向下变形，不像拱桥那样能把压力高效分流到两侧。'
  },
  whyStable: {
    title: '为什么拱形更稳？',
    text: '石材抗压性能强、抗拉性能弱。拱形结构让主要内力以“受压”为主，更符合石材特性，因此更稳定。'
  },
  smallArch: {
    title: '小拱为什么重要？',
    text: '小拱/敞肩能减轻桥身自重，降低主拱负担；洪水时还能分流过水，减少冲击，提升桥梁整体稳定性。'
  }
};

function setExplanation(key) {
  explanationTitle.textContent = explanations[key].title;
  explanationText.textContent = explanations[key].text;
}

function clearAnimation() {
  animationTimers.forEach((timerId) => clearTimeout(timerId));
  animationTimers = [];

  [forcePathDown, forcePathLeft, forcePathRight, beamLoadArrow].forEach((path) => {
    path.classList.remove('active');
  });

  leftAbutment.classList.remove('highlight-abutment');
  rightAbutment.classList.remove('highlight-abutment');
}

function runArchAnimation() {
  clearAnimation();
  setExplanation('mainArch');

  animationTimers.push(setTimeout(() => {
    forcePathDown.classList.add('active');
    setExplanation('forceArch');
  }, 300));

  animationTimers.push(setTimeout(() => {
    forcePathLeft.classList.add('active');
    forcePathRight.classList.add('active');
  }, 1500));

  animationTimers.push(setTimeout(() => {
    leftAbutment.classList.add('highlight-abutment');
    rightAbutment.classList.add('highlight-abutment');
    setExplanation('whyStable');
  }, 3200));
}

function runBeamAnimation() {
  clearAnimation();

  animationTimers.push(setTimeout(() => {
    beamLoadArrow.classList.add('active');
    beamDeflect.classList.remove('hidden');
    setExplanation('forceBeam');
  }, 350));
}

function setMode(mode) {
  currentMode = mode;

  modeButtons.forEach((btn) => {
    const active = btn.dataset.mode === mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  clearAnimation();

  if (mode === 'arch') {
    mainArch.classList.remove('hidden');
    smallArchLeft.classList.remove('hidden');
    smallArchRight.classList.remove('hidden');
    smallArchLabelL.classList.remove('hidden');
    smallArchLabelR.classList.remove('hidden');

    beamBody.classList.add('hidden');
    beamDeflect.classList.add('hidden');

    modeHint.textContent = '力沿主拱传向两侧桥台';
    setExplanation('mainArch');
  } else {
    mainArch.classList.add('hidden');
    smallArchLeft.classList.add('hidden');
    smallArchRight.classList.add('hidden');
    smallArchLabelL.classList.add('hidden');
    smallArchLabelR.classList.add('hidden');

    beamBody.classList.remove('hidden');
    beamDeflect.classList.remove('hidden');

    modeHint.textContent = '平梁跨中受压后更容易下挠';
    setExplanation('forceBeam');
  }
}

playBtn.addEventListener('click', () => {
  if (currentMode === 'arch') {
    runArchAnimation();
  } else {
    runBeamAnimation();
  }
});

resetBtn.addEventListener('click', () => {
  clearAnimation();
  if (currentMode === 'arch') {
    setExplanation('mainArch');
  } else {
    setExplanation('forceBeam');
  }
});

smallArchBtn.addEventListener('click', () => {
  setExplanation('smallArch');
  smallArchModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  smallArchModal.classList.add('hidden');
});

smallArchModal.addEventListener('click', (event) => {
  if (event.target === smallArchModal) {
    smallArchModal.classList.add('hidden');
  }
});

modeButtons.forEach((btn) => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

setMode('arch');
