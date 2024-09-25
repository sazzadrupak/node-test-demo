// Equality expect(...).toBe();expect(...).toEqual();
// Truthiness expect(...).toBeDefined(); expect(...).toBeNull(); expect(...).toBeTruthy(); expect(...).toBeFalsy();
// Numbers expect(...).toBeGreaterThan(); expect(...).toBeGreaterThanOrEqual(); expect(...).toBeLessThan(); expect(...).toBeLessThanOrEqual();
// Strings expect(...).toMatch(/regularExp/);
// Arrays expect(...).toContain();
// Objects expect(...).toBe();
// check for the equality of object references expect(...).toEqual();
// check for the equality of properties expect(...).toMatchObject();
// Exceptionsexpect(() => { someCode }).toThrow();


const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
  it('should return a positive num if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive num if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return a 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return greeting message', () => {
    const result = lib.greet('Rupak');
    expect(result).toMatch(/rupak/i);
    expect(result).toContain('Rupak');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 }); // Strict match
    expect(result).toMatchObject({ id: 1, price: 10 }); // loose match
    expect(result).toHaveProperty('id', 1); // other property except id can be ignored
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    // Falsy values in JS: Null, undefined, NaN, '', 0, false
    [null, undefined, NaN, '', 0, false].forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('rupak');
    expect(result).toMatchObject({ username: 'rupak' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should 1pply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = (customerId) => {
      console.log('Fake reading customer...');
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', async () => {
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('...'));
    // const result = await mockFunction();

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/i);
  });
});
