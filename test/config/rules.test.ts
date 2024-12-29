import { describe, expect, it } from "vitest";
import { hostRules, portRules } from "../../src/config/rules";

describe('TEST for host validation rule', () => {
    it('Given some valid host input, when trigger hostRule, then it should pass validation', () => {
        // Arrange
        const hosts = ["localhost", "qwer"]
        hosts.forEach((host) => {
            // Act
            const result = hostRules(host)
            // Assert
            expect(result._tag).toBe('Right')
        })
    })

    it('Given some invalid host input, when trigger hostRule, then it should not pass validation', () => {
        // Arrange
        const invalidHosts = ["", "  ", undefined]
        const expectErrors = [
            { key: 'host', step: 'isNonEmpty', error: 'host must be a non-empty string' },
            { key: 'host', step: 'isNonEmpty', error: 'host must be a non-empty string' },
            { key: 'host', step: 'isExist', error: 'host must exist' }
        ]
        invalidHosts.forEach((host, index) => {
            // Act
            const result = hostRules(host)
            // Assert
            expect(result._tag).toBe('Left')
            if (result._tag == 'Left') expect(result.left).toStrictEqual([expectErrors[index]])
        })
    })
})

describe('TEST for port validation rule', () => {
    it('Given some valid port input, when trigger portRule, then it should pass validation', () => {
        // Arrange
        const ports = ["666", "8080"]
        ports.forEach((port) => {
            // Act
            const result = portRules(port)
            // Assert
            expect(result._tag).toBe('Right')
        })
    })

    it('Given some invalid port input, when trigger portRule, then it should not pass validation', () => {
        // Arrange
        const ports = ["localhost", "qwer", "888888", "-88", "", "  ", undefined]
        const expectErrors = [
            { key: 'port', step: 'canParseInt', error: 'port must be a valid integer' },
            { key: 'port', step: 'canParseInt', error: 'port must be a valid integer' },
            { key: 'port', step: 'isInRange', error: 'port must be in the range 1-65535' },
            { key: 'port', step: 'isInRange', error: 'port must be in the range 1-65535' },
            { key: 'port', step: 'isNonEmpty', error: 'port must be a non-empty string' },
            { key: 'port', step: 'isNonEmpty', error: 'port must be a non-empty string' },
            { key: 'port', step: 'isExist', error: 'port must exist' }
        ]
        ports.forEach((port, index) => {
            // Act
            const result = portRules(port)

            // Assert
            expect(result._tag).toBe('Left')
            if (result._tag == 'Left') expect(result.left).toStrictEqual([expectErrors[index]])
        })
    })
})