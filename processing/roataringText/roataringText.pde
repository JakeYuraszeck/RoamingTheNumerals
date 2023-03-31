float x_pos = 0.0;
float y_pos = 0.0;
float t = 0.0 ;

void setup() {
  size(1000, 1000);
  background(222, 184, 135);
  noFill();
  colorMode(HSB);
  stroke(30*(.5*cos(2*t)+.5),255,170);
  
}

void draw() {
  float i =0.0;
  while (i<0.01) {
    ellipse(get_coords(t+i)[0], get_coords(t+i)[1], 2, 2);
    i+=0.0005
  }
  stroke(30*(.5*cos(2*t)+.5),255,170);
  t+=0.01;
}

void get_coords(float t){
  y_pos = -200*(cos(.5*t) + cos(2*t))+410;
  x_pos = -200*(sin(t) + sin(4*t))+500;
  return [x_pos,y_pos];
}