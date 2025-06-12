const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SearchFilterService {
  constructor() {
    this.filters = [];
  }

  async getAll() {
    await delay(150);
    return [...this.filters];
  }

  async getById(id) {
    await delay(100);
    const filter = this.filters.find(f => f.id === id);
    return filter ? { ...filter } : null;
  }

  async create(filterData) {
    await delay(200);
    const newFilter = {
      ...filterData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString()
    };
    this.filters.push(newFilter);
    return { ...newFilter };
  }

  async update(id, filterData) {
    await delay(250);
    const index = this.filters.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('Filter not found');
    }
    this.filters[index] = { ...this.filters[index], ...filterData };
    return { ...this.filters[index] };
  }

  async delete(id) {
    await delay(150);
    const index = this.filters.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('Filter not found');
    }
    const deleted = this.filters.splice(index, 1)[0];
    return { ...deleted };
  }

  async saveFilter(name, filterCriteria) {
    await delay(200);
    const savedFilter = {
      id: Date.now().toString(),
      name,
      ...filterCriteria,
      createdDate: new Date().toISOString()
    };
    this.filters.push(savedFilter);
    return { ...savedFilter };
  }

  async getRecentSearches() {
    await delay(150);
    return [...this.filters]
      .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
      .slice(0, 5);
  }
}

export default new SearchFilterService();