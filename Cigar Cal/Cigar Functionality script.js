// Data for the cigars, including a corrected value for Hoyo De Monterrey
const cigarData = {
    'Montecristo': {
        perCigarPrice: 350, perCigarCommission: 87.5, // 25% of 350
        box12Price: 4200, box12Commission: 1050,
        box18Price: 6300, box18Commission: 1575
    },
    'Cohiba': {
        perCigarPrice: 450, perCigarCommission: 112.5, // 25% of 450
        box12Price: 5400, box12Commission: 1350,
        box18Price: 8100, box18Commission: 2025
    },
    'Romeo y Julieta': {
        perCigarPrice: 550, perCigarCommission: 137.5, // 25% of 550
        box12Price: 6600, box12Commission: 1650,
        box18Price: 9900, box18Commission: 2475
    },
    'Paratags': {
        perCigarPrice: 650, perCigarCommission: 162.5, // 25% of 650
        box12Price: 7800, box12Commission: 1950,
        box18Price: 11700, box18Commission: 2925
    },
    'Hoyo De Monterrey': {
        // Commission rate is 37.5% for this brand
        perCigarPrice: 750, perCigarCommission: 281.25, // 37.5% of 750
        box12Price: 9000, box12Commission: 3375,
        box18Price: 13500, box18Commission: 5062.50 // Calculated based on 37.5%
    },
    'Fuente': {
        perCigarPrice: 850, perCigarCommission: 212.5, // 25% of 850
        box12Price: 10200, box12Commission: 2550,
        box18Price: 15300, box18Commission: 3825
    },
    'Oliva': {
        perCigarPrice: 1000, perCigarCommission: 250, // 25% of 1000
        box12Price: 12000, box12Commission: 3000,
        box18Price: 18000, box18Commission: 4500
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const cigarInputsDiv = document.getElementById('cigar-inputs');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalPriceDisplay = document.getElementById('total-price');
    const totalCommissionDisplay = document.getElementById('total-commission');

    // Dynamically generate the input fields for each cigar brand
    for (const brand in cigarData) {
        const brandDiv = document.createElement('div');
        brandDiv.className = 'cigar-brand';
        brandDiv.innerHTML = `
            <h4>${brand}</h4>
            <div class="cigar-input">
                <label for="${brand}-cigar-count">Cigars:</label>
                <input type="number" id="${brand}-cigar-count" min="0" value="0">
            </div>
            <div class="cigar-input">
                <label for="${brand}-box12-count">Box of 12:</label>
                <input type="number" id="${brand}-box12-count" min="0" value="0">
            </div>
            <div class="cigar-input">
                <label for="${brand}-box18-count">Box of 18:</label>
                <input type="number" id="${brand}-box18-count" min="0" value="0">
            </div>
        `;
        cigarInputsDiv.appendChild(brandDiv);
    }

    calculateBtn.addEventListener('click', calculateTotals);

    function calculateTotals() {
        let grandTotalPrice = 0;
        let grandTotalCommission = 0;

        for (const brand in cigarData) {
            const data = cigarData[brand];
            const cigarCount = parseInt(document.getElementById(`${brand}-cigar-count`).value) || 0;
            const box12Count = parseInt(document.getElementById(`${brand}-box12-count`).value) || 0;
            const box18Count = parseInt(document.getElementById(`${brand}-box18-count`).value) || 0;
            
            // Calculate totals for each brand
            const brandPrice = (cigarCount * data.perCigarPrice) + (box12Count * data.box12Price) + (box18Count * data.box18Price);
            const brandCommission = (cigarCount * data.perCigarCommission) + (box12Count * data.box12Commission) + (box18Count * data.box18Commission);

            grandTotalPrice += brandPrice;
            grandTotalCommission += brandCommission;
        }

        // Display the results
        totalPriceDisplay.textContent = `$${grandTotalPrice.toFixed(2)}`;
        totalCommissionDisplay.textContent = `$${grandTotalCommission.toFixed(2)}`;
    }
});