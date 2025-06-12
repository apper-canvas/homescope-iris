import propertyData from '../mockData/property.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertyData];
  }

  async getAll() {
    await delay(300);
    return [...this.properties];
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.id === id);
    return property ? { ...property } : null;
  }

  async create(propertyData) {
    await delay(400);
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(),
      listingDate: new Date().toISOString()
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }

  async update(id, propertyData) {
    await delay(350);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    this.properties[index] = { ...this.properties[index], ...propertyData };
    return { ...this.properties[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    const deleted = this.properties.splice(index, 1)[0];
    return { ...deleted };
  }

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    const filtered = this.properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.address.street.toLowerCase().includes(searchTerm) ||
      property.address.city.toLowerCase().includes(searchTerm) ||
      property.address.state.toLowerCase().includes(searchTerm)
    );
    return [...filtered];
  }

  async filter(filters) {
    await delay(350);
    let filtered = [...this.properties];

    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= filters.priceMin);
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= filters.priceMax);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms);
    }
    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(p => filters.propertyType.includes(p.propertyType));
    }
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(p =>
        p.address.city.toLowerCase().includes(location) ||
        p.address.state.toLowerCase().includes(location)
      );
    }

    return [...filtered];
  }
}

export default new PropertyService();