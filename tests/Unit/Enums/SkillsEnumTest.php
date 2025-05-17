<?php

declare(strict_types=1);

namespace Tests\Unit\Enums;

use App\Enums\SkillsEnum;
use Tests\TestCase;

final class SkillsEnumTest extends TestCase
{
    public function test_get_returns_array_of_associative_arrays(): void
    {
        $result = SkillsEnum::get();

        $this->assertIsArray($result);
        $this->assertNotEmpty($result);

        // Check structure of first item
        $firstItem = $result[0];
        $this->assertArrayHasKey('value', $firstItem);
        $this->assertArrayHasKey('label', $firstItem);
        $this->assertEquals($firstItem['value'], $firstItem['label']);

        // Verify all enum cases are included
        $this->assertCount(count(SkillsEnum::cases()), $result);
    }

    public function test_get_from_db_returns_formatted_array(): void
    {
        $skills = ['PHP', 'JavaScript', 'Laravel'];
        $result = SkillsEnum::getFromDb($skills);

        $this->assertIsArray($result);
        $this->assertCount(count($skills), $result);

        // Check structure of items
        foreach ($result as $index => $item) {
            $this->assertArrayHasKey('value', $item);
            $this->assertArrayHasKey('label', $item);
            $this->assertEquals($skills[$index], $item['value']);
            $this->assertEquals($skills[$index], $item['label']);
        }
    }

    public function test_get_from_db_with_null_returns_empty_array(): void
    {
        $result = SkillsEnum::getFromDb(null);

        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }

    public function test_get_values_returns_array_of_strings(): void
    {
        $result = SkillsEnum::getValues();

        $this->assertIsArray($result);
        $this->assertNotEmpty($result);

        // Check all items are strings
        foreach ($result as $item) {
            $this->assertIsString($item);
        }

        // Verify all enum cases are included
        $this->assertCount(count(SkillsEnum::cases()), $result);

        // Verify specific values are included
        $this->assertContains(SkillsEnum::PHP->value, $result);
        $this->assertContains(SkillsEnum::JavaScript->value, $result);
        $this->assertContains(SkillsEnum::Laravel->value, $result);
    }
}
