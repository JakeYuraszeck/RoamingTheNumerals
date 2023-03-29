float x_pos = 0.0;

void setup() {
  size(1000, 100);
  background(222, 184, 135);
}

void draw() {
  ellipse(x_pos,50, 10, 10);
  x_pos +=1
}
