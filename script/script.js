const canvasSetup = document.getElementById("canvas");
const ctx = canvasSetup.getContext("2d");
var width = canvasSetup.width = window.innerWidth;
var height = canvasSetup.height = window.innerHeight;
const rad = deg => (deg * Math.PI) / 180.0;

var recursion_slider = document.getElementById("recursion_slider");
var angle_slider = document.getElementById("angle_slider");
var select = document.getElementById("dropdown");
var axiom, replace_axiom, thickness, dist;

class turtle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.angle = rad(-90);
    this.k = 1;    
  }
  
  forward(distance, color){
    const newX = this.x + distance * Math.cos(this.angle) * this.k;
    const newY = this.y + distance * Math.sin(this.angle) * this.k;
    line(this.x, this.y, newX, newY, color, thickness);
    this.x = newX;
    this.y = newY;
  }
  
  backward(distance, color){
    this.forward(-distance, color);
  }
  
  right(angle){
    this.angle -= rad(angle);
  }
  
  left(angle){
    this.angle += rad(angle);
  }
  
  setpos(x, y){
    this.x = x;
    this.y = y;
  }
}

function line(x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function new_axiom(replace_axiom) {
	axiom = "A";
	for(let c = 0; c < recursion_slider.value; c++){
  		axiom = axiom.replace(/A/g, replace_axiom);
	}
}

const t = new turtle(width/2, height);

main();
async function main() {
	var selectedOption = select.selectedIndex;
	switch(selectedOption){
		case 0:
			recursion_slider.max = 14;
			recursion_slider.value = 8;
			recursion_text.textContent = 8;
			replace_axiom = "F[+A][-A]";
			new_axiom(replace_axiom);
			thickness = 10 * (height/722);
			dist = 210 * (height/722);
			break;
		case 1:
			recursion_slider.max = 9;
			recursion_slider.value = 4;
			recursion_text.textContent = 4;
			replace_axiom = "F[+A-A][-A]";
			new_axiom(replace_axiom);
			thickness = 10 * (height/722);;
			dist = 145 * (height/722); 
			break;
		case 2:
			recursion_slider.max = 6;
			recursion_slider.value = 3;
			recursion_text.textContent = 3;
			replace_axiom = "F[+A][-A]FA";
			new_axiom(replace_axiom);
			thickness = 5 * (height/722);;
			dist = 50 * (height/722); 
			break;
		case 3:
			recursion_slider.max = 4;
			recursion_slider.value = 2;
			recursion_text.textContent = 2;
			replace_axiom = "[-FA][+FA]FA-[-A+A+A]+[+A-A-A]";
			new_axiom(replace_axiom);
			thickness = 3 * (height/722);;
			dist = 35 * (height/722); 
			break;
		case 4:
			recursion_slider.max = 10;
			recursion_slider.value = 5;
			recursion_text.textContent = 5;
			replace_axiom = "F[+F-A][-F+A]";
			new_axiom(replace_axiom);
			thickness = 10 * (height/722);;
			dist = 140 * (height/722); 
			break;
	}
	angle_text.textContent = angle_slider.value;
	draw();
}

function draw() {
	const t = new turtle(width/2, height);
	let st = [], a = angle_slider.value;
	ctx.clearRect(0, 0, width, height);
	for(let i in axiom){
	 if(axiom[i] == "F")
	   t.forward(dist, '#fff');
	 if(axiom[i] == "A")
	   t.forward(dist, "#1e90ff");
	 if(axiom[i] == "+")
	   t.right(a);
	 if(axiom[i] == "-")
	   t.left(a);
	 if(axiom[i] == "["){
	   st.push([t.x, t.y, t.angle, t.k, thickness]);
	   t.k /= 1.5;
	   thickness = thickness*0.8 > 1 ? thickness*0.8: Math.ceil(thickness*0.8);
	 }
	 if(axiom[i] == "]"){
	   t.setpos(st[st.length-1][0], st[st.length-1][1]);
	   t.angle = st[st.length-1][2];
	   t.k = st[st.length-1][3];
	   thickness = st[st.length-1][4];
	   st.pop();
	 }
	}
}

recursion_slider.addEventListener("input", function() {
	recursion_text.textContent = recursion_slider.value;
	new_axiom(replace_axiom);
	draw();
});

angle_slider.addEventListener("input", function() {
	angle_text.textContent = angle_slider.value;
	draw();
});

select.addEventListener("change", function() {
  main();
});
