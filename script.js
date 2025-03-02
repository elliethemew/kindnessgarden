// 🌱 Kindness Traits Data
let traits = {
    Empathy: 50,
    Courage: 50,
    Confidence: 50
};

// 🌿 Function to update the trait bars
function updateTraits() {
    for (let trait in traits) {
        document.getElementById(trait).style.width = traits[trait] + "%";
    }
}

// 🌼 Function to "grow" a trait
function growTrait(trait) {
    if (traits[trait] < 100) {
        traits[trait] += 10; // Increase by 10%
        updateTraits();
    }
}

// 🌱 Add event listeners when page loads
document.addEventListener("DOMContentLoaded", () => {
    updateTraits(); // Initialize trait bars
});
// Function to increase trait growth when button is clicked
function growTrait(trait) {
    let traitBar = document.getElementById(trait);
    let currentWidth = parseInt(traitBar.style.width) || 0;

    if (currentWidth < 100) { 
        traitBar.style.width = (currentWidth + 10) + "%";
    }
}