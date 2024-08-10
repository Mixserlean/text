const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('active');
    menuLinks.classList.toggle('active');

const svg = document.querySelector("svg")
const tileSize = 50;
const tilesWide = 40;
const tilesHigh = 20
const changeChance = 0.01
const animationTolerance = 0.002
const animationSpeed = 0.1

const targetPositions = Array(tilesWide * tilesHigh * 2).fill(0).map(_ => Math.random() > 0.5 ? -1 : 1)
const currentPositions = [...targetPositions]

function render() {
  let html = ""
  for (let x = 0; x < tilesWide; x++) {
    let linePoints = `M ${x * tileSize} 0`
    for (let y = 0; y < tilesHigh; y++) {
      const pos = currentPositions[x + y * tilesWide]
      linePoints += `L ${x * tileSize} ${(y + 0.2) * tileSize}`
      linePoints += `C ${x * tileSize} ${(y + 0.6) * tileSize}
                       ${(x + pos * 0.2) * tileSize} ${(y + 0.5 - (0.4 * pos * pos)) * tileSize}
                       ${(x + pos * 0.2) * tileSize} ${(y + 0.5) * tileSize}`
      linePoints += `C ${(x + pos * 0.2) * tileSize} ${(y + 0.5 + (0.4 * pos * pos)) * tileSize}
                       ${x * tileSize} ${(y + 0.4) * tileSize}
                       ${x * tileSize} ${(y + 0.8) * tileSize}`
    }
    html += `<path d="${linePoints}"/>`
  }
  for (let y = 0; y < tilesHigh; y++) {
    let linePoints = `M 0 ${y * tileSize}`
    for (let x = 0; x < tilesWide; x++) {
      const pos = currentPositions[x + y * tilesWide + (tilesWide * tilesHigh)]
      linePoints += `L ${(x + 0.2) * tileSize} ${y * tileSize} `
      linePoints += `C ${(x + 0.6) * tileSize} ${y * tileSize}
                       ${(x + 0.5 - (0.4 * pos * pos)) * tileSize} ${(y + pos * 0.2) * tileSize}
                       ${(x + 0.5) * tileSize} ${(y + pos * 0.2) * tileSize}`
      linePoints += `C ${(x + 0.5 + (0.4 * pos * pos)) * tileSize} ${(y + pos * 0.2) * tileSize}
                       ${(x + 0.4) * tileSize} ${y * tileSize} 
                       ${(x + 0.8) * tileSize} ${y * tileSize}`
    }
    html += `<path d="${linePoints}"/>`
  }
  svg.querySelector("g").innerHTML = html
}

function refresh() {
  window.requestAnimationFrame(refresh)
  const rect = svg.getBoundingClientRect();
  svg.width = rect.width
  svg.height = rect.height
  
  for (let i = 0; i < targetPositions.length; i++) {
    if (targetPositions[i] == currentPositions[i]) {
      if (Math.random() < changeChance) {
        targetPositions[i] = -targetPositions[i]
      }
    } else if (Math.abs(targetPositions[i] - currentPositions[i]) < animationTolerance) {
      console.log("tolerance")
      currentPositions[i] = targetPositions[i]
    } else {
      currentPositions[i] = targetPositions[i] * animationSpeed + currentPositions[i] * (1 - animationSpeed)
    }
  }
  render()
}

refresh();})