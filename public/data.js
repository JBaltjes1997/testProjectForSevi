async function fetchData() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();

        const container = document.getElementById('items-container');
        container.innerHTML = '';

        if (data.length === 0) {
          container.innerHTML = '<p>No data found.</p>';
          return;
        }
  
        data.forEach(item => {
          const div = document.createElement('div');
          div.className = 'item';
          div.innerHTML = `<h3>${item.name}</h3><p>${item.age}</p>`;
          container.appendChild(div);
        });
      } catch (err) {
        document.getElementById('items-container').innerHTML = '<p>Error loading data.</p>';
        console.error(err);
      }
    }

    fetchData();