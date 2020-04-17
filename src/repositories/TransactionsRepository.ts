import Transaction from '../models/Transaction';
/**
 * Deve receber title, value e type
 * type income = Entradas / outcome= Retiradas
 */
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransacrtionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allIncome: Transaction[] = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const allOutcome: Transaction[] = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = allIncome.reduce((prevVal, elem) => {
      return prevVal + elem.value;
    }, 0);

    const outcome = allOutcome.reduce((prevVal, elem) => {
      return prevVal + elem.value;
    }, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransacrtionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
