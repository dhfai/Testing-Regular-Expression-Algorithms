import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export interface Mutasi {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
}

export interface Nasabah {
  id: string;
  name: string;
  accountNo: string;
  balance: number;
  mutasi: Mutasi[];
}

export function useNasabah(accountNo: string | null) {
  const { data, error, mutate } = useSWR<Nasabah>(accountNo ? `/api/nasabah/${accountNo}` : null, fetcher);
  return {
    nasabah: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}
