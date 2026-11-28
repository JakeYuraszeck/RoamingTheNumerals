// Background equations, written in LaTeX. One list per level; the page gets harder from top to bottom:
//   1 hero          arithmetic            5 reviews          geometry, trig, logs
//   2 about         multiplication, fractions 6 booking      calculus
//   3 subjects      pre-algebra           7 contact/footer   beyond calculus
//   4 how it works  algebra
// To rebuild after editing: run  node tools/math-background/server.js  from the project folder, then open
// http://localhost:8765/tools/math-background/build.html in a browser.
window.EQUATIONS = {
  1: [
    '2 + 3 = 5', '9 - 4 = 5', '7 + 8 = 15', '10 - 6 = 4', '3 + 4 = 7', '12 - 5 = 7',
    '6 + 6 = 12', '15 - 9 = 6', '20 + 30 = 50', '1 + 1 = 2', '5 + 5 = 10', '18 - 9 = 9',
    '4 + 9 = 13', '11 - 3 = 8',
  ],
  2: [
    '7 \\times 8 = 56', '6 \\times 7 = 42', '144 \\div 12 = 12', '\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}',
    '\\frac{2}{3} \\times 3 = 2', '0.5 = \\frac{1}{2}', '25\\% = \\frac{1}{4}', '3^2 = 9', '\\sqrt{49} = 7',
    '2^3 = 8', '0.75 = \\frac{3}{4}', '\\frac{3}{4} \\div \\frac{1}{2} = \\frac{3}{2}', '9 \\times 9 = 81',
    '\\frac{6}{8} = \\frac{3}{4}',
  ],
  3: [
    'x + 5 = 12 \\Rightarrow x = 7', '3x = 21 \\Rightarrow x = 7', '2(x + 3) = 2x + 6', '\\frac{x}{4} = 3 \\Rightarrow x = 12',
    '|-7| = 7', '(-3)^2 = 9', '-2 + (-5) = -7', 'a + b = b + a', '2^5 = 32', '5x - 2 = 13 \\Rightarrow x = 3',
    'x^2 \\cdot x^3 = x^5', 'a(b + c) = ab + ac', '-4 \\times -3 = 12', '\\frac{x^5}{x^2} = x^3',
  ],
  4: [
    'y = mx + b', 'm = \\frac{y_2 - y_1}{x_2 - x_1}', '(x + 2)(x - 3) = x^2 - x - 6',
    'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', 'a^2 - b^2 = (a + b)(a - b)', '(a + b)^2 = a^2 + 2ab + b^2',
    'f(x) = 2x + 1', 'f^{-1}(x) = \\frac{x - 1}{2}', 'x^{-1} = \\frac{1}{x}', '\\sqrt{x} = x^{1/2}',
    '2x + 3y = 12', 'y - y_1 = m(x - x_1)', '(x^a)^b = x^{ab}',
  ],
  5: [
    'a^2 + b^2 = c^2', 'A = \\pi r^2', 'C = 2\\pi r', '\\sin^2\\theta + \\cos^2\\theta = 1',
    '\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}', '\\sin 30^\\circ = \\frac{1}{2}', 'V = \\frac{4}{3}\\pi r^3',
    'c^2 = a^2 + b^2 - 2ab\\cos C', '\\log_2 8 = 3', '\\log(ab) = \\log a + \\log b',
    'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}', '\\frac{a}{\\sin A} = \\frac{b}{\\sin B}', 'e^{\\ln x} = x',
    '180^\\circ = \\pi \\text{ rad}',
  ],
  6: [
    '\\frac{d}{dx} x^n = n x^{n-1}', '\\int x^2 \\, dx = \\frac{x^3}{3} + C', '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
    '\\frac{d}{dx} \\sin x = \\cos x', '\\frac{d}{dx} e^x = e^x', '\\int_0^1 x \\, dx = \\frac{1}{2}',
    "f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}", '\\int \\frac{1}{x} \\, dx = \\ln|x| + C',
    '\\frac{d}{dx} \\ln x = \\frac{1}{x}', "(fg)' = f'g + fg'", "\\int_a^b f'(x) \\, dx = f(b) - f(a)",
    '\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e', '\\sum_{k=1}^{n} k = \\frac{n(n + 1)}{2}',
  ],
  7: [
    'e^{i\\pi} + 1 = 0', '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}',
    'A\\mathbf{v} = \\lambda\\mathbf{v}', '\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}',
    '\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}',
    '\\det(AB) = \\det(A)\\det(B)', '\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u',
    'P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}', '\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\| \\cos\\theta',
    '\\operatorname{tr}(AB) = \\operatorname{tr}(BA)', '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}',
    '\\Gamma(n) = (n - 1)!',
  ],
};
