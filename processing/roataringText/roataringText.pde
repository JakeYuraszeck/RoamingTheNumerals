float x_pos = 0.0;
float y_pos = 0.0;
float t = 0.0;

void setup() {
  size(1000, 1000);
  background(222, 184, 135);
  noFill();
  colorMode(HSB);
  stroke(30*(.5*cos(2*t)+.5),255,170);
}

void draw() {
  float id = t % (8*PI);
  if (id < 4*PI){
    colorMode(HSB);
    stroke(15*cos(2*t)+15,255,170);
    float i =0.0;
    while (i<0.01) {
      float[] coords = get_coords(t+i);
      ellipse(coords[0], coords[1], 2, 2);
      i+=0.0005;
    }
  } else{
    colorMode(HSB);
    stroke(30*cos(2*t)+180,255,150);
    float i =0.0;
    while (i<0.01) {
      float[] coords = get_coords(t+i);
      ellipse(coords[0], coords[1], 2, 2);
      i+=0.0005;
    }
  }
  t+=0.01;
}

float[] get_coords(float t){
  y_pos = -180*(cos(.5*t) + cos(2*t))+380;
  x_pos = -180*(sin(2t) + sin(4*t))+500;
  return new float[] {x_pos,y_pos};
}
