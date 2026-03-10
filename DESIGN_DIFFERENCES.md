# 🎨 Perbedaan Desain Antar Tema

## 📐 Design System per Tema

### 1. 🔵 Default Theme - Clean & Professional
**Karakteristik Desain:**
- **Border Radius**: 0.75rem (medium, balanced)
- **Card Padding**: 1.5rem (standard)
- **Button Radius**: 0.5rem (slightly rounded)
- **Shadow**: Subtle & soft
- **Hover Effect**: Border bottom muncul biru
- **Typography**: Inter - clean & readable
- **Layout**: Straight & formal

**Visual Identity:**
```
┌─────────────────┐
│  Clean Card     │  ← Medium rounded corners
│  Professional   │  ← Subtle shadows
└─────────────────┘  ← Blue bottom border on hover
```

---

### 2. 🌈 Glass Light Theme - Rounded & Playful
**Karakteristik Desain:**
- **Border Radius**: 1.5rem (very rounded, soft)
- **Card Padding**: 2rem (spacious)
- **Button Radius**: 1rem (pill-like)
- **Shadow**: Soft & elevated
- **Hover Effect**: Scale up + rotate + lift
- **Typography**: Poppins - friendly & modern
- **Layout**: Bubbly & organic

**Visual Identity:**
```
╭─────────────────╮
│  Rounded Card   │  ← Very rounded corners
│  Playful Feel   │  ← Glass morphism
╰─────────────────╯  ← Bouncy hover animation
```

**Unique Features:**
- Card hover: `scale(1.03) + rotate(0.5deg) + translateY(-8px)`
- Extra spacious padding
- Soft, bubbly appearance

---

### 3. 🌙 Glass Dark Theme - Sleek & Minimal
**Karakteristik Desain:**
- **Border Radius**: 1rem (balanced)
- **Card Padding**: 1.75rem (comfortable)
- **Button Radius**: 0.75rem (modern)
- **Shadow**: Deep & dramatic
- **Hover Effect**: Slide right + lift + border glow
- **Typography**: Roboto - clean & technical
- **Layout**: Sleek with accent borders

**Visual Identity:**
```
┃─────────────────┐
┃  Sleek Card     │  ← Left accent border (purple)
┃  Minimal Dark   │  ← Slides right on hover
┗─────────────────┘
```

**Unique Features:**
- Left border accent (3px purple)
- Hover: `translateX(5px) + translateY(-5px)`
- Border glows on hover
- Technical, minimal aesthetic

---

### 4. 🔮 Cyberpunk Theme - Sharp & Edgy
**Karakteristik Desain:**
- **Border Radius**: 0.25rem (sharp, angular)
- **Card Padding**: 1.5rem (compact)
- **Button Radius**: 0.25rem (very sharp)
- **Shadow**: Neon glow (pink + cyan)
- **Hover Effect**: Skew correction + neon pulse
- **Typography**: Orbitron - futuristic & bold
- **Layout**: Angular with skew effect

**Visual Identity:**
```
╱─────────────────╲
│  Sharp Card     │  ← Sharp corners (0.25rem)
│  Neon Glow      │  ← Slight skew (-0.5deg)
╲─────────────────╱  ← Neon glow shadow
```

**Unique Features:**
- Card has `skewY(-0.5deg)` by default
- Hover removes skew: `skewY(0deg)`
- Neon glow shadows (pink + cyan)
- Letter-spacing increased (0.1em)
- Sharp, angular corners

---

## 🎯 Perbandingan Visual

### Border Radius
```
Default:    ╭──╮  0.75rem (medium)
Glass Light: ╭───╮ 1.5rem (very round)
Glass Dark:  ╭─╮  1rem (balanced)
Cyberpunk:   ┌─┐  0.25rem (sharp)
```

### Card Padding
```
Default:     [  1.5rem  ]  Standard
Glass Light: [   2rem   ]  Spacious
Glass Dark:  [  1.75rem ]  Comfortable
Cyberpunk:   [  1.5rem  ]  Compact
```

### Hover Effects
```
Default:     ↓ Border bottom appears
Glass Light: ↗ Scale + Rotate + Lift
Glass Dark:  → Slide right + Lift
Cyberpunk:   ✨ Neon glow pulse
```

### Typography Style
```
Default:     Inter      - Clean, professional
Glass Light: Poppins    - Friendly, rounded
Glass Dark:  Roboto     - Technical, minimal
Cyberpunk:   Orbitron   - Futuristic, bold
```

---

## 🎨 CSS Variables per Tema

### Default Theme
```css
--border-radius: 0.75rem;
--card-padding: 1.5rem;
--button-radius: 0.5rem;
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

### Glass Light Theme
```css
--border-radius: 1.5rem;
--card-padding: 2rem;
--button-radius: 1rem;
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
```

### Glass Dark Theme
```css
--border-radius: 1rem;
--card-padding: 1.75rem;
--button-radius: 0.75rem;
--shadow-lg: 0 15px 30px -5px rgba(0, 0, 0, 0.5);
```

### Cyberpunk Theme
```css
--border-radius: 0.25rem;
--card-padding: 1.5rem;
--button-radius: 0.25rem;
--shadow-lg: 0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4);
```

---

## 🚀 Cara Menggunakan

Semua komponen otomatis menggunakan design variables:

```jsx
// GlassCard otomatis menyesuaikan
<GlassCard>
  {/* Border radius, padding, shadow semuanya berbeda per tema */}
  Content
</GlassCard>

// GlassButton otomatis menyesuaikan
<GlassButton variant="primary">
  {/* Button radius berbeda per tema */}
  Click Me
</GlassButton>
```

---

## 💡 Tips Desain

### Untuk Default Theme
- Gunakan layout yang rapi dan terstruktur
- Hindari efek berlebihan
- Fokus pada readability

### Untuk Glass Light Theme
- Manfaatkan spacing yang luas
- Gunakan warna-warna cerah
- Tambahkan animasi playful

### Untuk Glass Dark Theme
- Gunakan accent borders untuk highlight
- Manfaatkan contrast yang tinggi
- Fokus pada minimalism

### Untuk Cyberpunk Theme
- Gunakan sharp corners
- Tambahkan neon accents
- Manfaatkan angular layouts
- Gunakan uppercase text untuk emphasis

---

## 🎭 Mood Board

**Default**: 📊 Corporate, Professional, Trustworthy
**Glass Light**: 🌈 Playful, Modern, Friendly
**Glass Dark**: 🌙 Sophisticated, Minimal, Elegant
**Cyberpunk**: ⚡ Futuristic, Bold, Edgy

---

**Setiap tema sekarang memiliki identitas visual yang unik!** 🎨✨
