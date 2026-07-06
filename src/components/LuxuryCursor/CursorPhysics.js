/**
 * Spring physics and velocity tracking for premium organic custom cursor motion
 */

export class Spring {
  /**
   * Create a 1D physics spring
   * @param {number} initialValue - starting value
   * @param {number} stiffness - spring stiffness (lower = slower, higher = tighter)
   * @param {number} damping - spring damping/friction (lower = more bouncy, higher = less overshoot)
   */
  constructor(initialValue = 0, stiffness = 0.08, damping = 0.75) {
    this.value = initialValue;
    this.target = initialValue;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  /**
   * Update the spring value towards the target
   * @param {number} [targetValue] - optional new target
   * @returns {number} the current spring value
   */
  update(targetValue) {
    if (targetValue !== undefined) {
      this.target = targetValue;
    }
    
    // F = -k * x
    const force = (this.target - this.value) * this.stiffness;
    
    // a = F / m (assuming mass = 1)
    this.velocity += force;
    
    // Apply damping/friction
    this.velocity *= this.damping;
    
    // Update position
    this.value += this.velocity;
    
    return this.value;
  }

  /**
   * Instantly snap the spring to a value
   * @param {number} val
   */
  snapTo(val) {
    this.value = val;
    this.target = val;
    this.velocity = 0;
  }
}

export class VelocityTracker {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    this.lastTime = typeof window !== 'undefined' ? performance.now() : Date.now();
  }

  /**
   * Update tracker with new position coordinates and calculate velocity vectors
   * @param {number} newX 
   * @param {number} newY 
   */
  update(newX, newY) {
    const now = typeof window !== 'undefined' ? performance.now() : Date.now();
    const dt = Math.max(now - this.lastTime, 16.67); // Clamp dt to prevent spike anomalies
    this.lastTime = now;

    // Pixels per millisecond
    this.vx = (newX - this.x) / dt;
    this.vy = (newY - this.y) / dt;
    
    this.x = newX;
    this.y = newY;
    
    // Pixels per millisecond speed
    this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    
    return {
      vx: this.vx,
      vy: this.vy,
      speed: this.speed
    };
  }
}
