float x_pos = 0.0;

void setup() {
  size(1000, 100);
  background(222, 184, 135);
}

void draw() {
  ellipse(0,0, 100, 100);
  ellipse(1000,0, 100, 100);
  ellipse(0,100, 100, 100);
  ellipse(1000,100, 100, 100);
  x_pos +=10
}
