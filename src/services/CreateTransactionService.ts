import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

/**
 * Deve receber title, value e type
 * type income = Entradas / outcome= Retiradas
 */
interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const incomeTotal = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (incomeTotal.total < value) {
        throw Error('Transaction error, insufficient funds');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
