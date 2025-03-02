// Wait for the page to fully load before setting up event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let currentTrait = '';
    let careCount = 0;
    let currentActivity = '';
    let journalVisible = true;
    
    // Get DOM elements
    const selectionDiv = document.getElementById('selection');
    const gardenDiv = document.getElementById('garden');
    const traitNameSpan = document.getElementById('trait-name');
    const plantDiv = document.getElementById('plant');
    const progressDiv = document.getElementById('progress');
    const progressTextSpan = document.getElementById('progress-text');
    const stageSpan = document.getElementById('stage');
    const stageTextSpan = document.getElementById('stage-text');
    const entriesDiv = document.getElementById('entries');
    const reflectionModal = document.getElementById('reflection-modal');
    const questionH3 = document.getElementById('question');
    const reflectionTextarea = document.getElementById('reflection');

    // Trait selection event listeners
    document.getElementById('empathy').addEventListener('click', function() {
        selectTrait('Empathy');
    });
    
    document.getElementById('courage').addEventListener('click', function() {
        selectTrait('Courage');
    });
    
    document.getElementById('confidence').addEventListener('click', function() {
        selectTrait('Confidence');
    });
    
    document.getElementById('optimism').addEventListener('click', function() {
        selectTrait('Optimism');
    });
    
    // Activity button event listeners
    document.getElementById('water').addEventListener('click', function() {
        showReflectionModal('water');
    });
    
    document.getElementById('sunshine').addEventListener('click', function() {
        showReflectionModal('sunshine');
    });
    
    document.getElementById('love').addEventListener('click', function() {
        showReflectionModal('love');
    });
    
    // Modal button event listeners
    document.getElementById('cancel').addEventListener('click', closeReflectionModal);
    document.getElementById('submit').addEventListener('click', submitReflection);
    
    // Journal toggle event listener
    document.getElementById('toggle-journal').addEventListener('click', toggleJournal);
    
    // Reset button event listener
    document.getElementById('reset').addEventListener('click', resetGarden);
    
    // Function to select a trait
    function selectTrait(trait) {
        currentTrait = trait;
        traitNameSpan.textContent = trait;
        selectionDiv.style.display = 'none';
        gardenDiv.style.display = 'block';
        
        // Set initial plant appearance
        plantDiv.className = 'plant';
        plantDiv.classList.add(`${trait.toLowerCase()}-seed`);
        
        // Add first journal entry
        addEntry(`Started nurturing ${trait} in your garden!`);
    }
    
    // Function to show reflection modal
    function showReflectionModal(activity) {
        currentActivity = activity;
        
        if (activity === 'water') {
            questionH3.textContent = `How do you want to nurture your ${currentTrait.toLowerCase()}?`;
        } else if (activity === 'sunshine') {
            questionH3.textContent = `What happened today that made you feel ${currentTrait.toLowerCase()}?`;
        } else if (activity === 'love') {
            questionH3.textContent = `What do you want to tell yourself today about ${currentTrait.toLowerCase()}?`;
        }
        
        reflectionTextarea.value = '';
        reflectionModal.style.display = 'flex';
    }
    
    // Function to close reflection modal
    function closeReflectionModal() {
        reflectionModal.style.display = 'none';
    }
    
    // Function to submit reflection
    function submitReflection() {
        const reflectionText = reflectionTextarea.value.trim();
        
        if (reflectionText === '') {
            return;
        }
        
        // Add growth point and update progress
        careCount++;
        updateProgress();
        
        // Log in journal
        let message = '';
        if (currentActivity === 'water') {
            message = `💧 Watered your ${currentTrait} plant. Reflection: "${reflectionText}"`;
        } else if (currentActivity === 'sunshine') {
            message = `☀️ Added sunshine to your ${currentTrait} plant. Experience: "${reflectionText}"`;
        } else if (currentActivity === 'love') {
            message = `💖 Showed love to your ${currentTrait} plant. Affirmation: "${reflectionText}"`;
        }
        
        addEntry(message);
        closeReflectionModal();
    }
    
    // Function to update progress
    function updateProgress() {
        // Update progress bar
        const progressPercent = (careCount / 76) * 100;
        progressDiv.style.width = `${progressPercent}%`;
        progressTextSpan.textContent = `${careCount}/76 practices`;
        
        // Update growth stage
        let stage = 'Seed';
        
        if (careCount >= 4 && careCount < 16) {
            stage = 'Sprout';
        } else if (careCount >= 16 && careCount < 36) {
            stage = 'Growing';
        } else if (careCount >= 36) {
            stage = 'Blooming';
        }
        
        stageSpan.textContent = stage;
        stageTextSpan.textContent = stage;
    }
    
    // Function to add entry to journal
    function addEntry(text) {
        const entry = document.createElement('div');
        entry.className = 'entry';
        
        const now = new Date();
        const dateStr = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        entry.textContent = `[${dateStr}] ${text}`;
        
        entriesDiv.insertBefore(entry, entriesDiv.firstChild);
    }
    
    // Function to toggle journal visibility
    function toggleJournal() {
        journalVisible = !journalVisible;
        
        if (journalVisible) {
            entriesDiv.style.display = 'block';
        } else {
            entriesDiv.style.display = 'none';
        }
    }
    
    // Function to reset garden
    function resetGarden() {
        selectionDiv.style.display = 'grid';
        gardenDiv.style.display = 'none';
        entriesDiv.innerHTML = '';
        careCount = 0;
        currentTrait = '';
        
        // Reset plant
        plantDiv.className = 'plant';
        
        // Reset progress
        progressDiv.style.width = '0%';
        progressTextSpan.textContent = '0/76 practices';
        stageSpan.textContent = 'Seed';
        stageTextSpan.textContent = 'Seed';
    }
});