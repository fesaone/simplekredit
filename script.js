var range = document.getElementById('uangMuka');
range.addEventListener('input', function() {
	var value = (range.value - range.min) / (range.max - range.min);
	range.style.background =
		'linear-gradient(to right, red 0%, red ' +
		value * 100 +
		'%, #f2f2f2 ' +
		value * 100 +
		'%, #f2f2f2 100%)';
});

let kendaraan = [];

fetch('database/unit.json')
	.then(response => response.json())
	.then(data => {
	kendaraan = data.kendaraan;
	initializeApplication();
})
	.catch(error => console.error('Error:', error));

const jenisKendaraan = document.getElementById('jenisKendaraan');
const warna = document.getElementById('warna');
const uangMuka = document.getElementById('uangMuka');
const periodeAngsuran = document.getElementById('periodeAngsuran');
const simulasiForm = document.getElementById('simulasiForm');
const hasilSimulasi = document.getElementById('hasilSimulasi');
const uangMukaValue = document.getElementById('uangMukaValue');

function updateUangMukaValue() {
	uangMukaValue.textContent = `${uangMuka.value}%`;
}

uangMuka.addEventListener('input', updateUangMukaValue);

function hitungSimulasi(e) {
	e.preventDefault();
	const indexKendaraan = jenisKendaraan.value;
	const indexWarna = warna.value;
	const kendaraanTerpilih = kendaraan[indexKendaraan];
	const warnaTerpilih = kendaraanTerpilih.warna[indexWarna];
	const hargaAsli = warnaTerpilih.harga;
	const periode = parseInt(periodeAngsuran.value);
	const dp = parseInt(uangMuka.value) / 100;
	const TotalUangMUKA = hargaAsli * dp;
	const pokokBULAN = hargaAsli / periode;
	let bungaMultiplier;

	switch (periode) {
		case 12:
			bungaMultiplier = 1.0;
			break;
		case 24:
			bungaMultiplier = 2.0;
			break;
		case 36:
			bungaMultiplier = 3.0;
			break;
		default:
			bungaMultiplier = 1.0;
	}

	const bungaBULAN = pokokBULAN * dp * bungaMultiplier;
	const AngsuranPokokperBULAN = pokokBULAN;
	const AngsuranBungaperBULAN =
				(bungaMultiplier * bungaBULAN) / bungaMultiplier;
	const cicilan = AngsuranPokokperBULAN + AngsuranBungaperBULAN;
	const tahunTOTAL = cicilan * periode;

	hasilSimulasi.classList.remove('hidden');
	document.getElementById('gambarKendaraan').src = warnaTerpilih.gambar;
	document.getElementById('namaKendaraan').textContent = kendaraanTerpilih.nama;
	document.getElementById('warnaKendaraan').textContent = warnaTerpilih.warna;
	document.getElementById(
		'hargaAsli'
	).textContent = `Rp ${warnaTerpilih.harga.toLocaleString()}`;
	document.getElementById('tenorCicilan').textContent = `${periode} Bulan`;

	document.getElementById(
		'AngsuranBungaperBULAN'
	).textContent = `Rp ${AngsuranBungaperBULAN.toLocaleString('id-ID', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
	document.getElementById(
		'TotalUangMUKA'
	).textContent = `Rp ${TotalUangMUKA.toLocaleString('id-ID', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})}`;
	document.getElementById(
		'AngsuranPokokperBULAN'
	).textContent = `Rp ${AngsuranPokokperBULAN.toLocaleString('id-ID', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
	document.getElementById(
		'cicilanPerBulan'
	).textContent = `Rp ${cicilan.toLocaleString('id-ID', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
	document.getElementById('dpPersentase').textContent = `${(dp * 100).toFixed(
		0
	)}%`;
	document.getElementById(
		'tahunTOTAL'
	).textContent = `Rp ${tahunTOTAL.toLocaleString()}`;
}

function initializeApplication() {
	function populateKendaraanDropdown() {
		kendaraan.forEach((item, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = item.nama;
			jenisKendaraan.appendChild(option);
		});
	}

	function populateWarnaDropdown() {
		const indexKendaraan = jenisKendaraan.value;
		const warnaKendaraan = kendaraan[indexKendaraan].warna;
		warna.innerHTML = '<option value="" disabled selected>Pilih Warna</option>';
		warnaKendaraan.forEach((item, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = item.warna;
			warna.appendChild(option);
		});
	}

	populateKendaraanDropdown();
	jenisKendaraan.addEventListener('change', () => {
		populateWarnaDropdown();
	});
	jenisKendaraan.addEventListener('change', () => {
		populateWarnaDropdown();
	});

	simulasiForm.addEventListener('submit', hitungSimulasi);
	simulasiForm.addEventListener('submit', function(event) {
		event.preventDefault();
		hasilSimulasi.classList.remove('hidden');
		const hasilSimulasiTop = hasilSimulasi.offsetTop;
		window.scrollTo({
			top: hasilSimulasiTop,
			behavior: 'smooth',
		});
	});
}
