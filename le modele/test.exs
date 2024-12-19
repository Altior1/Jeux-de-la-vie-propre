def is_prime?(integer()) :: boolean()
  def is_prime?(number) do
    is_prime?(number, number - 1)
  end
  def is_prime?(number, 2), do: rem(number, 2) != 0
  def is_prime?(number, divider) do
    if rem(number, divider) == 0 do
      false
    else
      is_prime?(number, divider - 1)
    end
  end

IO.puts(is_prime(4))
