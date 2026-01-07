(() => {
  const canvas = document.getElementById('pong');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const paddle = {w:10,h:80,x:10,y:(H-80)/2, speed:6};
  const ai = {w:10,h:80,x:W-20,y:(H-80)/2, speed:4};
  const ball = {x:W/2,y:H/2,r:8,vx:4,vy:3};
  let keys = {};

  window.addEventListener('keydown', e=>keys[e.key] = true);
  window.addEventListener('keyup', e=>keys[e.key] = false);

  function drawRect(x,y,w,h,col){ ctx.fillStyle=col; ctx.fillRect(x,y,w,h);} 
  function drawCircle(x,y,r,col){ ctx.fillStyle=col; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
  function resetBall(){ ball.x=W/2; ball.y=H/2; ball.vx = (Math.random()>0.5?1:-1)*4; ball.vy = (Math.random()>0.5?1:-1)*3; }

  function update(){
    // player
    if(keys['w']||keys['W']||keys['ArrowUp']) paddle.y -= paddle.speed;
    if(keys['s']||keys['S']||keys['ArrowDown']) paddle.y += paddle.speed;
    paddle.y = Math.max(0, Math.min(H - paddle.h, paddle.y));

    // simple AI
    if(ai.y + ai.h/2 < ball.y) ai.y += ai.speed; else ai.y -= ai.speed;
    ai.y = Math.max(0, Math.min(H - ai.h, ai.y));

    // ball
    ball.x += ball.vx; ball.y += ball.vy;
    if(ball.y - ball.r < 0 || ball.y + ball.r > H) ball.vy *= -1;

    // paddle collision
    if(ball.x - ball.r < paddle.x + paddle.w && ball.y > paddle.y && ball.y < paddle.y + paddle.h){
      ball.vx = Math.abs(ball.vx) + 0.5; ball.vx *= -1; }
    if(ball.x + ball.r > ai.x && ball.y > ai.y && ball.y < ai.y + ai.h){
      ball.vx = -Math.abs(ball.vx) - 0.5; }

    // score/out of bounds
    if(ball.x < 0 || ball.x > W){ resetBall(); }
  }

  function render(){
    ctx.clearRect(0,0,W,H);
    drawRect(0,0,W,H,'#071a2b');
    // middle line
    ctx.fillStyle = '#083344';
    for(let y=10;y<H;y+=24) ctx.fillRect(W/2-1,y,2,12);
    // paddles
    drawRect(paddle.x,paddle.y,paddle.w,paddle.h,'#bfeafc');
    drawRect(ai.x,ai.y,ai.w,ai.h,'#bfeafc');
    drawCircle(ball.x,ball.y,ball.r,'#ffd');
  }

  function loop(){ update(); render(); requestAnimationFrame(loop); }
  resetBall(); loop();
})();
